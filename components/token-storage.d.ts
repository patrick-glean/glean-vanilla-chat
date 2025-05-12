declare class TokenStorage {
    private static readonly TOKEN_KEY;
    private static readonly BACKEND_URL_KEY;
    private static readonly DEFAULT_BACKEND_URL;
    getToken(): string | null;
    setToken(token: string): void;
    clearToken(): void;
    getBackendUrl(): string;
    setBackendUrl(url: string): void;
    clearBackendUrl(): void;
}
declare const tokenStorage: TokenStorage;
export default tokenStorage;
