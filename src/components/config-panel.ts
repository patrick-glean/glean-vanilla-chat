import tokenStorage from './token-storage.js';

class ConfigPanel {
    private panel!: HTMLElement;
    private tokenInput!: HTMLInputElement;
    private saveButton!: HTMLButtonElement;
    private tokenStatus!: HTMLElement;
    private revealButton!: HTMLButtonElement;
    private hasUnsavedChanges: boolean = false;
    private uniqueId: string;

    constructor() {
        this.uniqueId = `config-panel-${Date.now()}`;
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
                <label for="api-token-${this.uniqueId}">API Token:</label>
                <div class="token-input-container">
                    <input type="password" id="api-token-${this.uniqueId}" placeholder="Enter your API token" autocomplete="off">
                    <button type="button" id="reveal-token-${this.uniqueId}" class="reveal-button" aria-label="Toggle password visibility">👁️</button>
                </div>
                <div class="button-group">
                    <button type="submit" id="save-token-${this.uniqueId}" class="save-button">Save Token</button>
                    <button type="button" id="reset-token-${this.uniqueId}" class="reset-button">Reset</button>
                </div>
                <div id="current-token-status-${this.uniqueId}"></div>
            </form>
        `;
    }

    private initializeElements(): void {
        this.tokenInput = this.panel.querySelector(`#api-token-${this.uniqueId}`) as HTMLInputElement;
        this.saveButton = this.panel.querySelector(`#save-token-${this.uniqueId}`) as HTMLButtonElement;
        this.tokenStatus = this.panel.querySelector(`#current-token-status-${this.uniqueId}`) as HTMLElement;
        this.revealButton = this.panel.querySelector(`#reveal-token-${this.uniqueId}`) as HTMLButtonElement;
        const resetButton = this.panel.querySelector(`#reset-token-${this.uniqueId}`) as HTMLButtonElement;

        // Set initial value if token exists
        const existingToken = tokenStorage.getToken();
        if (existingToken) {
            this.tokenInput.value = existingToken;
        }

        // Add reset button functionality
        resetButton.addEventListener('click', () => {
            const storedToken = tokenStorage.getToken();
            if (storedToken) {
                this.tokenInput.value = storedToken;
                this.hasUnsavedChanges = false;
                this.updateSaveButtonState();
                this.showSuccess('Token reset to saved value');
            } else {
                this.showError('No saved token found');
            }
        });
    }

    private initializeEventListeners(): void {
        // Track input changes
        this.tokenInput.addEventListener('input', (e) => {
            e.stopPropagation();
            const currentToken = tokenStorage.getToken();
            const newToken = this.tokenInput.value.trim();
            this.hasUnsavedChanges = currentToken !== newToken;
            this.updateSaveButtonState();
        });

        // Handle focus events
        this.tokenInput.addEventListener('focus', (e) => {
            e.stopPropagation();
            if (this.tokenInput.type === 'password') {
                this.tokenInput.type = 'text';
                this.revealButton.textContent = '🔒';
            }
        });

        this.tokenInput.addEventListener('blur', (e) => {
            e.stopPropagation();
            if (this.tokenInput.type === 'text' && !this.revealButton.getAttribute('data-revealed')) {
                this.tokenInput.type = 'password';
                this.revealButton.textContent = '👁️';
            }
        });

        // Prevent form submission
        this.panel.querySelector('form')?.addEventListener('submit', (e) => {
            e.preventDefault();
            e.stopPropagation();
        });

        this.saveButton.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const token = this.tokenInput.value.trim();
            if (token) {
                tokenStorage.setToken(token);
                this.hasUnsavedChanges = false;
                this.updateSaveButtonState();
                this.showSuccess('Token saved successfully');
            } else {
                this.showError('Please enter a token');
            }
        });
    }

    private updateSaveButtonState(): void {
        if (this.hasUnsavedChanges) {
            this.saveButton.classList.add('has-changes');
            this.saveButton.textContent = 'Save Changes';
        } else {
            this.saveButton.classList.remove('has-changes');
            this.saveButton.textContent = 'Save Token';
        }
    }

    private initializeRevealButton(): void {
        let isRevealed = false;
        const togglePasswordVisibility = (e: Event) => {
            e.preventDefault();
            e.stopPropagation();
            isRevealed = !isRevealed;
            this.tokenInput.type = isRevealed ? 'text' : 'password';
            this.revealButton.textContent = isRevealed ? '🔒' : '👁️';
            this.revealButton.setAttribute('aria-label', isRevealed ? 'Hide password' : 'Show password');
            this.revealButton.setAttribute('data-revealed', isRevealed.toString());
            // Remove focus from input
            this.tokenInput.blur();
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