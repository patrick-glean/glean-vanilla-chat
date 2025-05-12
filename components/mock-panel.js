export class MockPanel {
    constructor() {
        this.container = document.getElementById('mock-container');
        if (this.container) {
            this.render();
        }
    }
    render() {
        this.container.innerHTML = `
            <div class="mock-panel">
                <h2>Mock Messages</h2>
                <div class="mock-form">
                    <div class="form-group">
                        <label for="mock-message">Message:</label>
                        <textarea id="mock-message" placeholder="Type a mock message"></textarea>
                    </div>
                    <button id="send-mock-message">Send Mock Message</button>
                </div>
            </div>
        `;
        // Initialize event listeners
        this.initializeEventListeners();
    }
    initializeEventListeners() {
        const messageInput = this.container.querySelector('#mock-message');
        const sendButton = this.container.querySelector('#send-mock-message');
        if (messageInput && sendButton) {
            // Handle send button click
            sendButton.addEventListener('click', () => this.handleSendMessage(messageInput));
            // Handle enter key in message input
            messageInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.handleSendMessage(messageInput);
                }
            });
        }
    }
    handleSendMessage(messageInput) {
        const message = messageInput.value.trim();
        if (!message)
            return;
        // Log message to console
        console.log('Mock Message:', message);
        // Clear input
        messageInput.value = '';
    }
}
//# sourceMappingURL=mock-panel.js.map