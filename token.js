import ConfigPanel from './components/config-panel.js';
import tokenStorage from './components/token-storage.js';
class TokenManager {
    constructor() {
        this.configPanel = null;
        // Only initialize the UI if the container exists
        const tokenManagerContainer = document.getElementById('token-manager-container');
        if (tokenManagerContainer) {
            // Clear any existing content
            tokenManagerContainer.innerHTML = '';
            this.configPanel = new ConfigPanel();
            tokenManagerContainer.appendChild(this.configPanel.getPanel());
        }
    }
    getToken() {
        return tokenStorage.getToken();
    }
    setToken(token) {
        tokenStorage.setToken(token);
    }
    clearToken() {
        tokenStorage.clearToken();
    }
}
// Initialize token manager
const tokenManager = new TokenManager();
export default tokenManager;
//# sourceMappingURL=token.js.map