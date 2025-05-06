class TokenStorage {
    private static readonly TOKEN_KEY = 'api_token';
    private static readonly BACKEND_URL_KEY = 'backend_url';
    private static readonly DEFAULT_BACKEND_URL = 'http://localhost:3000';

    public getToken(): string | null {
        return localStorage.getItem(TokenStorage.TOKEN_KEY);
    }

    public setToken(token: string): void {
        localStorage.setItem(TokenStorage.TOKEN_KEY, token);
    }

    public clearToken(): void {
        localStorage.removeItem(TokenStorage.TOKEN_KEY);
    }

    public getBackendUrl(): string {
        return localStorage.getItem(TokenStorage.BACKEND_URL_KEY) || TokenStorage.DEFAULT_BACKEND_URL;
    }

    public setBackendUrl(url: string): void {
        localStorage.setItem(TokenStorage.BACKEND_URL_KEY, url);
    }

    public clearBackendUrl(): void {
        localStorage.removeItem(TokenStorage.BACKEND_URL_KEY);
    }
}

const tokenStorage = new TokenStorage();
export default tokenStorage; 