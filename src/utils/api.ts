import tokenStorage from '../components/token-storage.js';

interface ApiResponse<T> {
    data?: T;
    error?: string;
    status: number;
}

export interface StructuredResult {
    document?: {
        title?: string;
        id?: string;
        url?: string;
    };
}

export interface Fragment {
    text?: string;
    structuredResults?: StructuredResult[];
    querySuggestion?: {
        query: string;
        datasource: string;
    };
}

export interface ChatMessage {
    author: 'USER' | 'ASSISTANT' | 'GLEAN_AI';
    fragments: Fragment[];
    messageId?: string;
    messageType?: string;
    stepId?: string;
    workflowId?: string;
    isStepComplete?: boolean;
}

interface ChatRequest {
    stream: true;
    messages: ChatMessage[];
}

class ApiError extends Error {
    constructor(public status: number, message: string) {
        super(message);
        this.name = 'ApiError';
    }
}

const DEBUG_PREFIX = '🔍 API Debug:';

export async function apiCall<T>(
    endpoint: string,
    options: RequestInit = {},
    onStreamMessage?: (message: ChatMessage) => void
): Promise<ApiResponse<T>> {
    const backendUrl = tokenStorage.getBackendUrl();
    const token = tokenStorage.getToken();
    const url = `${backendUrl}/rest/api/v1${endpoint}`;

    // Prepare headers
    const headers = new Headers(options.headers);
    if (token) {
        headers.set('Authorization', `Bearer ${token}`);
    }
    headers.set('Content-Type', 'application/json');

    // Prepare request options
    const requestOptions: RequestInit = {
        ...options,
        headers,
        mode: 'cors',
        credentials: 'omit'
    };

    // Log request details
    console.group(`${DEBUG_PREFIX} Request`);
    console.log('URL:', url);
    console.log('Method:', options.method || 'GET');
    console.log('Headers:', Object.fromEntries(headers.entries()));
    if (options.body) {
        try {
            const body = JSON.parse(options.body as string);
            console.log('Body:', body);
        } catch (e) {
            console.log('Body:', options.body);
        }
    }
    console.groupEnd();

    try {
        const response = await fetch(url, requestOptions);
        
        // Log raw response details
        console.group(`${DEBUG_PREFIX} Response`);
        console.log('Status:', response.status);
        console.log('Headers:', Object.fromEntries(response.headers.entries()));
        
        // Get the raw text
        const rawText = await response.text();
        console.log('Raw response:', rawText);

        if (!response.ok) {
            throw new ApiError(response.status, 'API request failed');
        }

        // Handle streaming response (multiple JSON objects)
        const messages: ChatMessage[] = [];
        const lines = rawText.split('\n').filter(line => line.trim());
        
        for (const line of lines) {
            try {
                const message = JSON.parse(line);
                if (message.messages) {
                    const newMessages = message.messages as ChatMessage[];
                    messages.push(...newMessages);
                    
                    // Emit each message as it comes in
                    if (onStreamMessage) {
                        newMessages.forEach(msg => onStreamMessage(msg));
                    }
                }
            } catch (parseError) {
                console.warn('Failed to parse line:', line);
            }
        }

        // Get the last message as the final response
        const lastMessage = messages[messages.length - 1];
        console.log('Parsed messages:', messages);
        console.groupEnd();

        return {
            data: lastMessage as T,
            status: response.status,
        };
    } catch (error) {
        // Log error details
        console.group(`${DEBUG_PREFIX} Error`);
        console.error('Error:', error);
        if (error instanceof TypeError) {
            console.error('Network Error Details:', error.message);
        }
        console.groupEnd();

        if (error instanceof ApiError) {
            return {
                error: error.message,
                status: error.status,
            };
        }

        return {
            error: error instanceof Error ? error.message : 'Network error occurred',
            status: 0,
        };
    }
}

export function createChatRequest(message: string): ChatRequest {
    return {
        stream: true,
        messages: [{
            author: 'USER',
            fragments: [{ text: message }]
        }]
    };
}

// Example usage:
// const response = await apiCall('/chat', {
//     method: 'POST',
//     body: JSON.stringify({ message: 'Hello' })
// }); 