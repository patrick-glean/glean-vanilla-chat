interface Message {
    text: string;
    sender: 'user' | 'bot';
    timestamp: number;
}
declare class ChatApp {
    private messagesContainer;
    private inputField;
    private sendButton;
    private messageHistory;
    private botResponses;
    constructor();
    private initialize;
    private initializeEventListeners;
    private showWelcomeMessage;
    private sendMessage;
    private addMessage;
}
