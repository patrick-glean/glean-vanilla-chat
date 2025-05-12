# Glean Vanilla Chat

A vanilla JavaScript/TypeScript chat application with modular architecture.

## Project Structure

```
src/
├── components/           # UI Components
│   ├── config-panel.ts   # Token configuration UI
│   ├── message-manager.ts # Message buffer and history management
│   ├── mock-manager.ts   # Mock message testing panel
│   └── token-storage.ts  # Token storage management
├── utils/               # Utility Functions
│   └── api.ts          # API communication with streaming support
├── chat.ts             # Main chat application
├── token.ts            # Token manager initialization
├── mock.ts             # Mock panel initialization
└── styles.css          # Global styles
```

## Key Components

### Message Management
- `MessageManager`: Handles message buffering and history
- Supports multiple message types (user, assistant, system)
- Real-time message status updates
- Message source tracking (glean, other, system)
- Event-based message updates
- Real-time streaming message support
- Intelligent fragment formatting based on content type
- Proper message accumulation for streaming responses

### Mock Testing Panel
- `MockManager`: Handles mock message testing
- Shared message manager instance
- Proper component initialization
- Support for testing different message types
- Easy integration with main chat interface

### Token Management
- `TokenStorage`: Handles token persistence in localStorage
- `ConfigPanel`: UI for token input and management
- `TokenManager`: Initializes and coordinates token-related components

### Chat Application
- `ChatApp`: Main chat interface and message handling
- `ApiService`: Handles API communication with streaming support
- Real-time message updates with status indicators
- Streaming message support for immediate feedback
- Support for structured results and document references
- Intelligent message fragment handling
- Content-type aware formatting

## Development

### Setup
```bash
npm install
```

### Development Server
```bash
npm run dev
```

### Build
```bash
npm run build
```

## Key Features
- Modular architecture with clear separation of concerns
- TypeScript for type safety
- Token management with secure storage
- Responsive UI with proper styling
- Error handling and user feedback
- Message buffering system
- Real-time streaming API support
- Immediate message updates
- Support for structured results
- Multiple message types and sources
- Mock testing panel for development
- Intelligent message formatting
- Proper component initialization
- Shared message management

## Notes
- Token UI can be removed in production by removing the token-manager-container
- API token is stored securely in localStorage
- All components are properly typed with TypeScript
- Build process handles TypeScript compilation and file copying
- Messages are buffered for history and state management
- Supports real-time streaming API responses
- Handles multiple message types and sources
- Processes structured results and document references
- Mock panel available for testing and development
- Intelligent formatting based on content type
- Proper component initialization sequence
- Shared message manager for consistency

## Live Demo

[![Glean Chat Demo](https://patrick-glean.github.io/glean-vanilla-chat/screenshot.png)](https://patrick-glean.github.io/glean-vanilla-chat/)

Click the image above to try the live demo!

## Features

- Simple, clean interface with three stacked boxes
- Real-time message updates
- Message history tracking
- Animated welcome message
- Responsive design
- Easy embedding capability
- Hot reloading for development
- Streaming message support
- Structured result handling
- Mock testing panel
- Intelligent message formatting
- Proper component initialization

## Deployment to GitHub Pages

1. Make sure you have committed all your changes
2. Run the deployment command:
```bash
npm run deploy
```

This will build the project and deploy it to the `gh-pages` branch of your repository.

Your site will be available at: https://patrick-glean.github.io/glean-vanilla-chat/

## Embedding the Chat

To embed the chat in your website, add the following to your HTML:

```html
<div id="glean-chat-container"></div>
<script type="module" src="https://patrick-glean.github.io/glean-vanilla-chat/index.js"></script>
```

## License

This project is licensed under the terms of the LICENSE file in the root of this repository.
