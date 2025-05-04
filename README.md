# Glean Vanilla Chat

A vanilla JavaScript/TypeScript chat application with modular architecture.

## Project Structure

```
src/
├── components/           # UI Components
│   ├── config-panel.ts   # Token configuration UI
│   └── token-storage.ts  # Token storage management
├── services/            # Service Layer
│   └── api.ts           # API communication service
├── chat.ts              # Main chat application
├── token.ts             # Token manager initialization
├── types.ts             # Shared TypeScript types
├── config.ts            # Application configuration
└── styles.css           # Global styles
```

## Key Components

### Token Management
- `TokenStorage`: Handles token persistence in localStorage
- `ConfigPanel`: UI for token input and management
- `TokenManager`: Initializes and coordinates token-related components

### Chat Application
- `ChatApp`: Main chat interface and message handling
- `ApiService`: Handles API communication with proper token management

### Configuration
- `config.ts`: Centralized configuration management
- `types.ts`: Shared TypeScript interfaces and types

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

## Notes
- Token UI can be removed in production by removing the token-manager-container
- API token is stored securely in localStorage
- All components are properly typed with TypeScript
- Build process handles TypeScript compilation and file copying

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
