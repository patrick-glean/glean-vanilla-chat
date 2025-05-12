export interface Message {
    id: string;
    role: 'user' | 'assistant' | 'system';
    content: string;
    timestamp: number;
    status?: 'sending' | 'sent' | 'error';
    source?: 'glean' | 'other' | 'system';
}
export declare class MessageManager {
    private messages;
    private onUpdate;
    constructor();
    addMessage(message: Omit<Message, 'id' | 'timestamp'>): Message;
    updateMessage(id: string, updates: Partial<Message>): void;
    getMessages(): Message[];
    setUpdateCallback(callback: (messages: Message[]) => void): void;
    private notifyUpdate;
    clear(): void;
}
