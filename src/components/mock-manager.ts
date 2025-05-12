import { MessageManager } from './message-manager.js';

export class MockManager {
    private messageInput: HTMLTextAreaElement;
    private sendButton: HTMLButtonElement;
    private messageManager: MessageManager;

    constructor(messageManager: MessageManager) {
        this.messageInput = document.getElementById('mock-message') as HTMLTextAreaElement;
        this.sendButton = document.getElementById('send-mock') as HTMLButtonElement;
        this.messageManager = messageManager;
        
        this.initializeEventListeners();
    }

    private initializeEventListeners(): void {
        // Handle send button click
        this.sendButton.addEventListener('click', () => this.handleSendMessage());

        // Handle enter key in message input
        this.messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.handleSendMessage();
            }
        });
    }

    private handleSendMessage(): void {
        const message = this.messageInput.value.trim();
        if (!message) return;

        // Add message to chat
        this.messageManager.addMessage({
            role: 'assistant',
            content: message,
            source: 'other',
            status: 'sent'
        });

        // Clear input
        this.messageInput.value = '';
    }
} 