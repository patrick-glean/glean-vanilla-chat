export class MessageManager {
    constructor() {
        this.messages = [];
        this.onUpdate = null;
        // Add welcome message
        this.addMessage({
            role: 'system',
            content: 'Welcome to the chat! How can I help you today?',
            source: 'system'
        });
    }
    addMessage(message) {
        const newMessage = {
            ...message,
            id: crypto.randomUUID(),
            timestamp: Date.now()
        };
        this.messages.push(newMessage);
        this.notifyUpdate();
        return newMessage;
    }
    updateMessage(id, updates) {
        const index = this.messages.findIndex(m => m.id === id);
        if (index !== -1) {
            this.messages[index] = { ...this.messages[index], ...updates };
            this.notifyUpdate();
        }
    }
    getMessages() {
        return [...this.messages];
    }
    setUpdateCallback(callback) {
        this.onUpdate = callback;
        // Immediately notify with current state
        callback(this.getMessages());
    }
    notifyUpdate() {
        if (this.onUpdate) {
            this.onUpdate(this.getMessages());
        }
    }
    clear() {
        this.messages = [];
        this.notifyUpdate();
    }
}
//# sourceMappingURL=message-manager.js.map