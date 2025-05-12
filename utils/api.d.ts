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
export declare function apiCall<T>(endpoint: string, options?: RequestInit, onStreamMessage?: (message: ChatMessage) => void): Promise<ApiResponse<T>>;
export declare function createChatRequest(message: string): ChatRequest;
export {};
