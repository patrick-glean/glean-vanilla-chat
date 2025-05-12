class TokenStorage {
    getToken() {
        return localStorage.getItem(TokenStorage.TOKEN_KEY);
    }
    setToken(token) {
        localStorage.setItem(TokenStorage.TOKEN_KEY, token);
    }
    clearToken() {
        localStorage.removeItem(TokenStorage.TOKEN_KEY);
    }
    getBackendUrl() {
        return localStorage.getItem(TokenStorage.BACKEND_URL_KEY) || TokenStorage.DEFAULT_BACKEND_URL;
    }
    setBackendUrl(url) {
        localStorage.setItem(TokenStorage.BACKEND_URL_KEY, url);
    }
    clearBackendUrl() {
        localStorage.removeItem(TokenStorage.BACKEND_URL_KEY);
    }
}
TokenStorage.TOKEN_KEY = 'api_token';
TokenStorage.BACKEND_URL_KEY = 'backend_url';
TokenStorage.DEFAULT_BACKEND_URL = 'http://localhost:3000';
const tokenStorage = new TokenStorage();
export default tokenStorage;
//# sourceMappingURL=token-storage.js.map