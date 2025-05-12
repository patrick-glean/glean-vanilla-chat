export class MockManager {
    constructor(messageManager) {
        this.messageInput = document.getElementById('mock-message');
        this.sendButton = document.getElementById('send-mock');
        this.messageManager = messageManager;
        this.initializeEventListeners();
    }
    initializeEventListeners() {
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
    handleSendMessage() {
        const message = this.messageInput.value.trim();
        if (!message)
            return;
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
//# sourceMappingURL=mock-manager.js.map