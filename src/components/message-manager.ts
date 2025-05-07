export interface Message {
    id: string;
    role: 'user' | 'assistant' | 'system';
    content: string;
    timestamp: number;
    status?: 'sending' | 'sent' | 'error';
    source?: 'glean' | 'other' | 'system';  // Added 'system' as a valid source
}

export class MessageManager {
    private messages: Message[] = [];
    private listeners: Set<(messages: Message[]) => void> = new Set();

    constructor() {
        // Add welcome message
        this.addMessage({
            role: 'system',
            content: 'Welcome to the chat! How can I help you today?',
            source: 'system'
        });
    }

    public addMessage(message: Omit<Message, 'id' | 'timestamp'>): Message {
        const newMessage: Message = {
            ...message,
            id: crypto.randomUUID(),
            timestamp: Date.now()
        };
        this.messages.push(newMessage);
        this.notifyListeners();
        return newMessage;
    }

    public updateMessage(id: string, updates: Partial<Message>): void {
        const index = this.messages.findIndex(m => m.id === id);
        if (index !== -1) {
            this.messages[index] = { ...this.messages[index], ...updates };
            this.notifyListeners();
        }
    }

    public getMessages(): Message[] {
        return [...this.messages];
    }

    public getMessageHistory(): Message[] {
        return this.messages.filter(m => m.role !== 'system');
    }

    public subscribe(listener: (messages: Message[]) => void): () => void {
        this.listeners.add(listener);
        // Immediately notify the new listener of current state
        listener(this.getMessages());
        // Return unsubscribe function
        return () => this.listeners.delete(listener);
    }

    private notifyListeners(): void {
        const messages = this.getMessages();
        this.listeners.forEach(listener => listener(messages));
    }

    public clear(): void {
        this.messages = [];
        this.notifyListeners();
    }
} 