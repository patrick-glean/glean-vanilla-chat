export class MockManager {
    private messageInput: HTMLTextAreaElement;
    private sendButton: HTMLButtonElement;

    constructor() {
        this.messageInput = document.getElementById('mock-message') as HTMLTextAreaElement;
        this.sendButton = document.getElementById('send-mock-message') as HTMLButtonElement;
        
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

        // Log message to console
        console.log('Mock Message:', message);

        // Clear input
        this.messageInput.value = '';
    }
} 