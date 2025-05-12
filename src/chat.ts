import { apiCall, createChatRequest } from './utils/api.js';
import { MessageManager, Message } from './components/message-manager.js';
import type { ChatMessage, Fragment, StructuredResult } from './utils/api.js';

class ChatApp {
    private messagesContainer: HTMLElement;
    private messageInput: HTMLInputElement;
    private sendButton: HTMLButtonElement;
    private messageManager: MessageManager;

    constructor() {
        this.messagesContainer = document.getElementById('messages') as HTMLElement;
        this.messageInput = document.getElementById('message-input') as HTMLInputElement;
        this.sendButton = document.getElementById('send-button') as HTMLButtonElement;
        this.messageManager = new MessageManager();

        this.initializeEventListeners();
        this.initializeMessageSubscription();
    }

    private initializeEventListeners(): void {
        this.sendButton.addEventListener('click', () => this.handleSendMessage());
        this.messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.handleSendMessage();
            }
        });
    }

    private initializeMessageSubscription(): void {
        this.messageManager.setUpdateCallback(messages => {
            this.renderMessages(messages);
        });
    }

    private async handleSendMessage(): Promise<void> {
        const message = this.messageInput.value.trim();
        if (!message) return;

        // Clear input
        this.messageInput.value = '';

        // Add user message
        const userMessage = this.messageManager.addMessage({
            role: 'user',
            content: message,
            source: 'glean',
            status: 'sending'
        });

        try {
            // Send to Glean API
            const chatRequest = createChatRequest(message);
            let currentAssistantMessage: Message | undefined;
            let accumulatedContent = '';

            const response = await apiCall<ChatMessage>('/chat', {
                method: 'POST',
                body: JSON.stringify(chatRequest)
            }, (streamMessage: ChatMessage) => {
                // Handle each message as it streams in
                if (streamMessage.fragments && streamMessage.fragments.length > 0) {
                    // Process each fragment
                    streamMessage.fragments.forEach((fragment: Fragment) => {
                        let newContent = '';
                        
                        if (fragment.text) {
                            newContent = fragment.text;
                        } else if (fragment.structuredResults) {
                            newContent = fragment.structuredResults
                                .map((r: StructuredResult) => r.document?.title)
                                .filter(Boolean)
                                .join(', ');
                        } else if (fragment.querySuggestion) {
                            newContent = fragment.querySuggestion.query;
                        }

                        if (newContent) {
                            // Accumulate content
                            accumulatedContent += (accumulatedContent ? '\n' : '') + newContent;

                            if (!currentAssistantMessage) {
                                // Create new message if this is the first fragment
                                currentAssistantMessage = this.messageManager.addMessage({
                                    role: 'assistant',
                                    content: accumulatedContent,
                                    source: 'glean',
                                    status: 'sending'
                                });
                            } else {
                                // Update existing message with accumulated content
                                this.messageManager.updateMessage(currentAssistantMessage.id, {
                                    content: accumulatedContent,
                                    status: 'sending'
                                });
                            }
                        }
                    });
                }
            });

            // Update user message status
            this.messageManager.updateMessage(userMessage.id, {
                status: response.error ? 'error' : 'sent'
            });

            // Update final assistant message status
            if (currentAssistantMessage) {
                this.messageManager.updateMessage(currentAssistantMessage.id, {
                    status: 'sent'
                });
            }

            if (response.error) {
                throw new Error(response.error);
            }
        } catch (error) {
            // Update user message status to error
            this.messageManager.updateMessage(userMessage.id, {
                status: 'error'
            });
            
            // Add error message to chat
            this.messageManager.addMessage({
                role: 'system',
                content: `Error: ${error instanceof Error ? error.message : 'Failed to send message'}`,
                source: 'system',
                status: 'error'
            });
        }
    }

    private renderMessages(messages: Message[]): void {
        this.messagesContainer.innerHTML = '';
        messages.forEach(message => {
            const messageElement = document.createElement('div');
            messageElement.className = `message ${message.role}${message.status === 'error' ? ' error' : ''}`;
            
            // Use textContent for plain text, but preserve line breaks
            messageElement.textContent = message.content;
            
            if (message.status === 'sending') {
                messageElement.className += ' sending';
            }
            
            this.messagesContainer.appendChild(messageElement);
        });
        
        // Scroll to bottom
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }

    public getMessageManager(): MessageManager {
        return this.messageManager;
    }
}

// Initialize chat app
const chatApp = new ChatApp();

// Expose message manager for other components
(window as any).messageManager = chatApp.getMessageManager(); 