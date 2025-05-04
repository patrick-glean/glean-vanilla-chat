import tokenStorage from '../components/token-storage.js';

interface Message {
    text: string;
    sender: 'user' | 'bot';
    timestamp: number;
}

interface ApiConfig {
    baseUrl: string;
    timeout?: number;
}

interface ApiMessage {
    author: 'USER' | 'BOT';
    fragments: Array<{
        text: string;
    }>;
}

class ApiError extends Error {
    constructor(message: string, public status?: number) {
        super(message);
        this.name = 'ApiError';
    }
}

class ChatApiService {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    private async fetchWithToken(endpoint: string, options: RequestInit = {}) {
        const token = tokenStorage.getToken();
        if (!token) {
            throw new Error('API token not found');
        }

        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            ...options.headers
        };

        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            ...options,
            headers
        });

        if (!response.ok) {
            throw new Error(`API request failed: ${response.statusText}`);
        }

        return response.json();
    }

    async sendMessage(text: string) {
        return this.fetchWithToken('/chat', {
            method: 'POST',
            body: JSON.stringify({ text })
        });
    }

    async getHistory() {
        return this.fetchWithToken('/history');
    }
}

export default ChatApiService; 