import { MockManager } from './components/mock-manager.js';
// Wait for the message manager to be available
const initializeMock = () => {
    const messageManager = window.messageManager;
    if (messageManager) {
        // Initialize mock panel with message manager
        const mockManager = new MockManager(messageManager);
    }
    else {
        // Try again in a short while
        setTimeout(initializeMock, 100);
    }
};
// Start initialization
initializeMock();
//# sourceMappingURL=mock.js.map