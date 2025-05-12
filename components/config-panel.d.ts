declare class ConfigPanel {
    private panel;
    private tokenInput;
    private backendUrlInput;
    private saveButton;
    private tokenStatus;
    private revealButton;
    private hasUnsavedChanges;
    private uniqueId;
    constructor();
    private createPanel;
    private initializeElements;
    private initializeEventListeners;
    private updateSaveButtonState;
    private initializeRevealButton;
    private showSuccess;
    private showError;
    getPanel(): HTMLElement;
}
export default ConfigPanel;
