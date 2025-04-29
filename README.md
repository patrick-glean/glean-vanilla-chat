# Glean Vanilla Chat

A simple, embeddable chat application built with vanilla TypeScript.

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

## Development

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

This will start a local server at http://localhost:8080 and watch for TypeScript changes.

## Building

To build the project:
```bash
npm run build
```

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

## Project Structure

```
glean-vanilla-chat/
├── src/
│   ├── index.ts      # Main chat application logic
│   └── styles.css    # Chat interface styling
├── dist/             # Built files (generated)
├── index.html        # Main HTML file
├── package.json      # Project configuration
├── tsconfig.json     # TypeScript configuration
├── nodemon.json      # Hot reloading configuration
├── CHANGELOG.md      # Project history
└── RULES.md         # Development guidelines
```

## License

This project is licensed under the terms of the LICENSE file in the root of this repository.
