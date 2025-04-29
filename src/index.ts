interface Message {
    text: string;
    sender: 'user' | 'bot';
    timestamp: number;
}

class ChatApp {
    private messagesContainer!: HTMLElement;
    private inputField!: HTMLInputElement;
    private sendButton!: HTMLButtonElement;
    private messageHistory: Message[] = [];
    private botResponses: string[] = [
        "Welcome to the agent. How can we help?",
        "I'm here to assist you with your questions.",
        "Feel free to ask me anything!",
        "I'm ready to help you find what you need.",
        "What can I do for you today?"
    ];

    constructor() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initialize());
        } else {
            this.initialize();
        }
    }

    private initialize(): void {
        this.messagesContainer = document.getElementById('chat-messages') as HTMLElement;
        this.inputField = document.getElementById('message-input') as HTMLInputElement;
        this.sendButton = document.getElementById('send-button') as HTMLButtonElement;

        if (!this.messagesContainer || !this.inputField || !this.sendButton) {
            console.error('Required DOM elements not found');
            return;
        }

        this.initializeEventListeners();
        this.showWelcomeMessage();
    }

    private initializeEventListeners(): void {
        this.sendButton.addEventListener('click', () => this.sendMessage());
        this.inputField.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });
    }

    private showWelcomeMessage(): void {
        const welcomeMessage = this.botResponses[0];
        const messageElement = document.createElement('div');
        messageElement.className = 'message bot welcome-message';
        messageElement.textContent = welcomeMessage;
        this.messagesContainer.appendChild(messageElement);
        
        this.messageHistory.push({
            text: welcomeMessage,
            sender: 'bot',
            timestamp: Date.now()
        });
    }

    private sendMessage(): void {
        const message = this.inputField.value.trim();
        if (message) {
            this.addMessage(message, 'user');
            this.inputField.value = '';
            
            // Simulate bot response with a random message from the responses array
            setTimeout(() => {
                const randomResponse = this.botResponses[Math.floor(Math.random() * this.botResponses.length)];
                this.addMessage(randomResponse, 'bot');
            }, 1000);
        }
    }

    private addMessage(text: string, sender: 'user' | 'bot'): void {
        const messageElement = document.createElement('div');
        messageElement.className = `message ${sender}`;
        messageElement.textContent = text;
        this.messagesContainer.appendChild(messageElement);
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;

        // Add to message history
        this.messageHistory.push({
            text,
            sender,
            timestamp: Date.now()
        });

        // Log the current message history (for debugging)
        console.log('Message History:', this.messageHistory);
    }
}

// Initialize the chat app
new ChatApp(); 