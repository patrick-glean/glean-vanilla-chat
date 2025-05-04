import { Message } from './types.js';
import tokenManager from './token.js';

class ChatApp {
    private messagesContainer: HTMLElement;
    private inputField: HTMLInputElement;
    private sendButton: HTMLButtonElement;
    private messageHistory: Message[] = [];

    constructor() {
        // Get DOM elements
        this.messagesContainer = document.getElementById('messages') as HTMLElement;
        if (!this.messagesContainer) {
            throw new Error('Messages container not found');
        }

        this.inputField = document.getElementById('message-input') as HTMLInputElement;
        if (!this.inputField) {
            throw new Error('Message input not found');
        }

        this.sendButton = document.getElementById('send-button') as HTMLButtonElement;
        if (!this.sendButton) {
            throw new Error('Send button not found');
        }

        this.initializeChat();
        this.showWelcomeMessage();
    }

    private showWelcomeMessage() {
        const welcomeMessage: Message = {
            text: 'Welcome to the Chat! Please enter your API token in the configuration panel to get started.',
            sender: 'bot',
            timestamp: Date.now()
        };
        this.addMessageToUI(welcomeMessage);
    }

    private async initializeChat() {
        this.inputField.addEventListener('keypress', async (e) => {
            if (e.key === 'Enter' && this.inputField.value.trim()) {
                await this.sendMessage(this.inputField.value);
                this.inputField.value = '';
            }
        });

        this.sendButton.addEventListener('click', async () => {
            if (this.inputField.value.trim()) {
                await this.sendMessage(this.inputField.value);
                this.inputField.value = '';
            }
        });
    }

    private async sendMessage(text: string) {
        const token = tokenManager.getToken();
        if (!token) {
            this.showError('Please enter your API token first');
            return;
        }

        const userMessage: Message = {
            text,
            sender: 'user',
            timestamp: Date.now()
        };

        this.addMessageToUI(userMessage);
        this.messageHistory.push(userMessage);

        try {
            // TODO: Implement API service with token
            const botMessage: Message = {
                text: `Echo: ${text}`,
                sender: 'bot',
                timestamp: Date.now()
            };
            this.messageHistory.push(botMessage);
            this.addMessageToUI(botMessage);
        } catch (error) {
            this.showError('An error occurred while sending the message');
        }
    }

    private addMessageToUI(message: Message) {
        const messageElement = document.createElement('div');
        messageElement.className = `message ${message.sender}`;
        messageElement.textContent = message.text;
        this.messagesContainer.appendChild(messageElement);
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }

    private showError(message: string) {
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        this.messagesContainer.appendChild(errorElement);
        setTimeout(() => errorElement.remove(), 3000);
    }
}

// Initialize chat app
new ChatApp(); 