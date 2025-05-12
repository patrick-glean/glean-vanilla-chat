# Glean Vanilla Chat

A vanilla JavaScript/TypeScript chat application with modular architecture.

## Features

- Simple, clean interface with three stacked boxes
- Real-time message updates with streaming support
- Message history tracking and buffering
- Animated welcome message
- Responsive design
- Easy embedding capability
- Mock testing panel for development
- Intelligent message formatting
- Token management with secure storage
- Support for structured results and document references

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

### Mock Testing Panel
- `MockManager`: Handles mock message testing
- Shared message manager instance
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
- Support for structured results and document references

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

## Deployment

### GitHub Pages Deployment
1. Make sure you have committed all your changes
2. Run:
```bash
npm run deploy
```
3. Your site will be available at: `https://<your-username>.github.io/glean-vanilla-chat/`

### API Proxy & Deployment Notes
- **GitHub Pages is static-only**: It cannot run server-side code
- If your chat app needs to call a backend API, you **must deploy your proxy/middleware to a separate service** (Vercel, Netlify, Cloudflare Workers, etc.)
- Update your frontend code to call the deployed proxy endpoint
- **Do not put API keys or secrets in the frontend code**

## Embedding the Chat

To embed the chat in your website, add the following to your HTML:

```html
<div id="glean-chat-container"></div>
<script type="module" src="https://patrick-glean.github.io/glean-vanilla-chat/index.js"></script>
```

## Live Demo

[![Glean Chat Demo](https://patrick-glean.github.io/glean-vanilla-chat/screenshot.png)](https://patrick-glean.github.io/glean-vanilla-chat/)

Click the image above to try the live demo!

## Documentation & Contributing

- For detailed development, code style, and contribution rules, see [RULES.md](./RULES.md)

## License

This project is licensed under the terms of the LICENSE file in the root of this repository.
