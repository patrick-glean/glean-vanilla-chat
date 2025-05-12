# Technical Documentation

## Architecture Overview

The Glean Vanilla Chat application follows a modular architecture with clear separation of concerns. The main components are:

1. **Message Management System**
   - Handles message buffering and history
   - Supports real-time streaming updates
   - Manages message types and sources
   - Implements event-based updates

2. **Token Management System**
   - Secure token storage using localStorage
   - UI for token configuration
   - Token validation and refresh logic

3. **Mock Testing System**
   - Development testing panel
   - Simulated message generation
   - Integration with main chat interface

4. **API Communication Layer**
   - Streaming support for real-time updates
   - Error handling and retry logic
   - Request/response type safety

## Component Details

### MessageManager

The `MessageManager` class is responsible for handling all message-related operations:

```typescript
interface Message {
  id: string;
  type: 'user' | 'assistant' | 'system';
  content: string;
  source: 'glean' | 'other' | 'system';
  status: 'pending' | 'complete' | 'error';
  timestamp: number;
}
```

Key features:
- Message buffering for streaming responses
- History management with proper ordering
- Event-based updates for real-time UI
- Type-safe message handling

### TokenStorage

The `TokenStorage` class manages token persistence:

```typescript
interface TokenConfig {
  apiKey: string;
  endpoint: string;
  lastUpdated: number;
}
```

Features:
- Secure localStorage implementation
- Token validation
- Automatic refresh handling
- Type-safe configuration

### MockManager

The `MockManager` provides testing capabilities:

```typescript
interface MockConfig {
  enabled: boolean;
  delay: number;
  messageTypes: MessageType[];
}
```

Features:
- Simulated message generation
- Configurable delays
- Multiple message type support
- Integration with main chat

## API Integration

### Streaming Support

The application uses the Fetch API with streaming support:

```typescript
async function streamResponse(response: Response) {
  const reader = response.body?.getReader();
  const decoder = new TextDecoder();
  
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    
    const chunk = decoder.decode(value);
    // Process chunk and update UI
  }
}
```

### Error Handling

Comprehensive error handling is implemented:

```typescript
interface ApiError {
  code: string;
  message: string;
  details?: unknown;
}

function handleApiError(error: ApiError) {
  // Log error
  // Update UI
  // Retry if appropriate
}
```

## UI Components

### Chat Interface

The main chat interface is built with vanilla TypeScript:

```typescript
class ChatApp {
  private messageManager: MessageManager;
  private tokenStorage: TokenStorage;
  
  constructor() {
    this.initializeComponents();
    this.setupEventListeners();
  }
  
  // Component methods
}
```

### Styling

The application uses CSS variables for theming:

```css
:root {
  --primary-color: #007bff;
  --secondary-color: #6c757d;
  --background-color: #ffffff;
  --text-color: #212529;
}
```

## Development Guidelines

1. **Type Safety**
   - Use TypeScript strict mode
   - Define interfaces for all data structures
   - Avoid `any` type

2. **Error Handling**
   - Implement proper error boundaries
   - Provide user feedback
   - Log errors appropriately

3. **Performance**
   - Minimize DOM operations
   - Use efficient data structures
   - Implement proper cleanup

4. **Testing**
   - Write unit tests for business logic
   - Test error cases
   - Verify UI updates

## Security Considerations

1. **Token Management**
   - Never expose API keys in frontend code
   - Use secure storage methods
   - Implement proper token refresh

2. **Input Validation**
   - Sanitize user input
   - Validate API responses
   - Handle malformed data

3. **CORS**
   - Configure proper CORS policies
   - Use appropriate headers
   - Handle preflight requests

## Deployment

### Static Hosting

The application is designed for static hosting:

1. Build process:
   ```bash
   npm run build
   ```

2. Deployment:
   ```bash
   npm run deploy
   ```

### API Proxy

For API communication:

1. Deploy proxy to serverless platform
2. Configure CORS and security
3. Update frontend endpoint

## Contributing

See [RULES.md](./RULES.md) for detailed contribution guidelines. 