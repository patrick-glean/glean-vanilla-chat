class TokenStorage {
    private static readonly TOKEN_KEY = 'api-token';

    public getToken(): string | null {
        return localStorage.getItem(TokenStorage.TOKEN_KEY);
    }

    public setToken(token: string): void {
        localStorage.setItem(TokenStorage.TOKEN_KEY, token);
    }

    public clearToken(): void {
        localStorage.removeItem(TokenStorage.TOKEN_KEY);
    }
}

export default new TokenStorage(); 