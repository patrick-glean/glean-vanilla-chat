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
    if (options.body) {
        try {
            const body = JSON.parse(options.body as string);
            // Log user message if present
            if (body.messages?.[0]?.fragments?.[0]?.text) {
                console.log('📝 User Message:', body.messages[0].fragments[0].text);
            }
        } catch (e) {
            console.log('❌ Invalid request body');
        }
    }
    console.groupEnd();

    try {
        const response = await fetch(url, requestOptions);
        
        // Log response status
        console.log(`${DEBUG_PREFIX} Response Status:`, response.status);
        
        if (!response.ok) {
            throw new ApiError(response.status, 'API request failed');
        }

        // Handle streaming response (multiple JSON objects)
        const messages: ChatMessage[] = [];
        const rawText = await response.text();
        const lines = rawText.split('\n').filter(line => line.trim());
        
        console.log(`${DEBUG_PREFIX} Processing ${lines.length} response lines`);
        
        for (const line of lines) {
            try {
                const data = JSON.parse(line);
                
                if (data.messages && Array.isArray(data.messages)) {
                    // Process each message in the array
                    data.messages.forEach((message: ChatMessage) => {
                        messages.push(message);
                        
                        // Log message details in a readable format
                        console.group(`📨 Message from ${message.author}`);
                        console.log(`ID: ${message.messageId || 'none'}`);
                        
                        if (message.fragments?.length) {
                            console.log(`Fragments (${message.fragments.length}):`);
                            message.fragments.forEach((f, i) => {
                                if (f.text) {
                                    console.log(`  ${i + 1}. Text: "${f.text}"`);
                                } else if (f.structuredResults?.length) {
                                    const titles = f.structuredResults
                                        .map(r => r.document?.title)
                                        .filter(Boolean)
                                        .join(', ');
                                    console.log(`  ${i + 1}. Structured: ${titles}`);
                                } else if (f.querySuggestion) {
                                    console.log(`  ${i + 1}. Suggestion: "${f.querySuggestion.query}"`);
                                }
                            });
                        } else {
                            console.log('No fragments');
                            console.log('Message:', message);
                        }
                        console.groupEnd();
                        
                        // Emit each message as it comes in
                        if (onStreamMessage) {
                            onStreamMessage(message);
                        }
                    });
                }
            } catch (parseError: unknown) {
                console.warn(`❌ Failed to parse line: ${parseError instanceof Error ? parseError.message : 'Unknown parse error'}`);
            }
        }

        // Get the last message as the final response
        const lastMessage = messages[messages.length - 1];
        console.log(`${DEBUG_PREFIX} Total messages processed: ${messages.length}`);

        return {
            data: lastMessage as T,
            status: response.status,
        };
    } catch (error) {
        console.error(`❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
        
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