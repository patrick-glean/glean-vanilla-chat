import { apiCall, createChatRequest } from './utils/api.js';
import { MessageManager, Message } from './components/message-manager.js';

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
        this.messageManager.subscribe(messages => {
            this.renderMessages(messages);
        });
    }

    private async handleSendMessage(): Promise<void> {
        const message = this.messageInput.value.trim();
        if (!message) return;

        // Clear input
        this.messageInput.value = '';

        // Add user message to buffer
        const userMessage = this.messageManager.addMessage({
            role: 'user',
            content: message,
            source: 'glean',
            status: 'sending'
        });

        try {
            // Send to Glean API
            const chatRequest = createChatRequest(message);
            const response = await apiCall<{ 
                author: string;
                fragments: Array<{ text: string }>;
                messageId: string;
                messageType: string;
                stepId: string;
                workflowId: string;
            }>('/chat', {
                method: 'POST',
                body: JSON.stringify(chatRequest)
            });

            // Update user message status
            this.messageManager.updateMessage(userMessage.id, {
                status: response.error ? 'error' : 'sent'
            });

            if (response.error) {
                throw new Error(response.error);
            }

            // Add assistant response to buffer
            if (response.data?.fragments) {
                const content = response.data.fragments
                    .map(f => f.text)
                    .join('');
                
                this.messageManager.addMessage({
                    role: 'assistant',
                    content,
                    source: 'glean',
                    status: 'sent'
                });
            }
        } catch (error) {
            console.error('Error sending message:', error);
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
            messageElement.textContent = message.content;
            if (message.status === 'sending') {
                messageElement.className += ' sending';
            }
            this.messagesContainer.appendChild(messageElement);
        });
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }
}

// Initialize chat app
const chatApp = new ChatApp(); 