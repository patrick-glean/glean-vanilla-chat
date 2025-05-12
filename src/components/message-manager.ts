export interface Message {
    id: string;
    role: 'user' | 'assistant' | 'system';
    content: string;
    timestamp: number;
    status?: 'sending' | 'sent' | 'error';
    source?: 'glean' | 'other' | 'system';
}

export class MessageManager {
    private messages: Message[] = [];
    private onUpdate: ((messages: Message[]) => void) | null = null;

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
        this.notifyUpdate();
        return newMessage;
    }

    public updateMessage(id: string, updates: Partial<Message>): void {
        const index = this.messages.findIndex(m => m.id === id);
        if (index !== -1) {
            this.messages[index] = { ...this.messages[index], ...updates };
            this.notifyUpdate();
        }
    }

    public getMessages(): Message[] {
        return [...this.messages];
    }

    public setUpdateCallback(callback: (messages: Message[]) => void): void {
        this.onUpdate = callback;
        // Immediately notify with current state
        callback(this.getMessages());
    }

    private notifyUpdate(): void {
        if (this.onUpdate) {
            this.onUpdate(this.getMessages());
        }
    }

    public clear(): void {
        this.messages = [];
        this.notifyUpdate();
    }
} 