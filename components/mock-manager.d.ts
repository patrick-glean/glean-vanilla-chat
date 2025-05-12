import { MessageManager } from './message-manager.js';
export declare class MockManager {
    private messageInput;
    private sendButton;
    private messageManager;
    constructor(messageManager: MessageManager);
    private initializeEventListeners;
    private handleSendMessage;
}
