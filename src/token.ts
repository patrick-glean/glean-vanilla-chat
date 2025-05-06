import ConfigPanel from './components/config-panel.js';
import tokenStorage from './components/token-storage.js';

class TokenManager {
    private configPanel: ConfigPanel | null = null;

    constructor() {
        // Only initialize the UI if the container exists
        const tokenManagerContainer = document.getElementById('token-manager-container');
        if (tokenManagerContainer) {
            // Clear any existing content
            tokenManagerContainer.innerHTML = '';
            this.configPanel = new ConfigPanel();
            tokenManagerContainer.appendChild(this.configPanel.getPanel());
        }
    }

    public getToken(): string | null {
        return tokenStorage.getToken();
    }

    public setToken(token: string): void {
        tokenStorage.setToken(token);
    }

    public clearToken(): void {
        tokenStorage.clearToken();
    }
}

// Initialize token manager
const tokenManager = new TokenManager();
export default tokenManager; 