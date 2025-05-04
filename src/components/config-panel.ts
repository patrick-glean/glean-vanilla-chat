import tokenStorage from './token-storage.js';

class ConfigPanel {
    private panel!: HTMLElement;
    private tokenInput!: HTMLInputElement;
    private saveButton!: HTMLButtonElement;
    private tokenStatus!: HTMLElement;
    private revealButton!: HTMLButtonElement;

    constructor() {
        this.createPanel();
        this.initializeElements();
        this.initializeEventListeners();
        this.initializeRevealButton();
    }

    private createPanel(): void {
        this.panel = document.createElement('div');
        this.panel.className = 'config-panel';
        this.panel.innerHTML = `
            <h3>Configuration</h3>
            <form class="config-section" onsubmit="return false;">
                <label for="api-token">API Token:</label>
                <div class="token-input-container">
                    <input type="password" id="api-token" placeholder="Enter your API token" autocomplete="off">
                    <button type="button" id="reveal-token" class="reveal-button" aria-label="Toggle password visibility">👁️</button>
                </div>
                <button type="submit" id="save-token">Save Token</button>
                <div id="current-token-status"></div>
            </form>
        `;
    }

    private initializeElements(): void {
        this.tokenInput = this.panel.querySelector('#api-token') as HTMLInputElement;
        this.saveButton = this.panel.querySelector('#save-token') as HTMLButtonElement;
        this.tokenStatus = this.panel.querySelector('#current-token-status') as HTMLElement;
        this.revealButton = this.panel.querySelector('#reveal-token') as HTMLButtonElement;

        // Set initial value if token exists
        const existingToken = tokenStorage.getToken();
        if (existingToken) {
            this.tokenInput.value = existingToken;
        }
    }

    private initializeEventListeners(): void {
        this.saveButton.addEventListener('click', () => {
            const token = this.tokenInput.value.trim();
            if (token) {
                tokenStorage.setToken(token);
                this.showSuccess('Token saved successfully');
            } else {
                this.showError('Please enter a token');
            }
        });
    }

    private initializeRevealButton(): void {
        let isRevealed = false;
        const togglePasswordVisibility = (e: Event) => {
            e.preventDefault();
            isRevealed = !isRevealed;
            this.tokenInput.type = isRevealed ? 'text' : 'password';
            this.revealButton.textContent = isRevealed ? '🔒' : '👁️';
            this.revealButton.setAttribute('aria-label', isRevealed ? 'Hide password' : 'Show password');
        };

        this.revealButton.addEventListener('click', togglePasswordVisibility);
        this.revealButton.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                togglePasswordVisibility(e);
            }
        });
    }

    private showSuccess(message: string): void {
        this.tokenStatus.textContent = message;
        this.tokenStatus.className = 'token-message success';
        setTimeout(() => {
            this.tokenStatus.textContent = '';
            this.tokenStatus.className = 'token-message';
        }, 3000);
    }

    private showError(message: string): void {
        this.tokenStatus.textContent = message;
        this.tokenStatus.className = 'token-message error';
        setTimeout(() => {
            this.tokenStatus.textContent = '';
            this.tokenStatus.className = 'token-message';
        }, 3000);
    }

    public getPanel(): HTMLElement {
        return this.panel;
    }
}

export default ConfigPanel; 