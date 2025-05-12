declare class TokenManager {
    private configPanel;
    constructor();
    getToken(): string | null;
    setToken(token: string): void;
    clearToken(): void;
}
declare const tokenManager: TokenManager;
export default tokenManager;
