# Development Rules and Guidelines

> **This file is the canonical source for all development, code style, architectural, and contribution rules for this project.**

---

## Code Organization

### Directory Structure
- Keep all source code in `src/`
- Group related components in subdirectories
- Use clear, descriptive file names
- Follow the established module pattern:
  ```
  src/
  ├── components/    # UI Components
  ├── utils/         # Helper Functions
  └── styles.css     # Global styles
  ```

### File Naming
- Use kebab-case for file names: `config-panel.ts`
- Use PascalCase for class names: `ConfigPanel`
- Use camelCase for variables and functions: `getToken()`
- Use UPPER_SNAKE_CASE for constants: `API_BASE_URL`

---

## TypeScript Guidelines

- Always define types for function parameters and return values
- Use interfaces for object structures
- Avoid `any` type - use `unknown` if type is truly unknown
- Use type guards for runtime type checking
- Use strict type checking
- Document complex types

---

## Component Guidelines

- Keep components focused and single-responsibility
- Use proper TypeScript types for props and state
- Implement proper error handling
- Add loading states where appropriate
- Use semantic HTML elements
- Follow accessibility guidelines

---

## State Management

- Use localStorage for persistent data
- Keep state as close to usage as possible
- Use proper TypeScript types for state
- Implement proper state initialization
- Handle state updates safely
- Track message history in memory
- Use timestamps for message ordering
- Keep UI state separate from data state
- Plan for future persistence needs

---

## API Guidelines

- Keep API calls in dedicated utility files (e.g., `src/utils/api.ts`)
- Use proper error handling
- Implement retry logic where appropriate
- Use proper TypeScript types for requests/responses
- Handle authentication consistently

---

## Error Handling

- Use try/catch for async operations
- Provide user feedback for errors
- Add error logging where appropriate
- Handle unexpected errors gracefully

---

## Testing Guidelines

- Write unit tests for business logic (if applicable)
- Test error and edge cases
- Use descriptive test names
- Add integration and end-to-end tests as the project grows

---

## Documentation

- Use JSDoc for public methods
- Explain complex logic
- Document edge cases
- Keep comments up to date
- Update README for new features and breaking changes
- Keep installation instructions current
- Update examples

---

## Git Workflow

- Use semantic commit messages
- Keep commits focused and atomic
- Reference issues in commit messages
- Format: `type(scope): description`
- Use feature branches for new features
- Use bugfix branches for fixes
- Keep branches up to date with main
- Delete merged branches after merging

---

## Build and Deployment

- Keep build process simple
- Use proper environment variables
- Handle different environments
- Keep dependencies up to date
- Minify and optimize code for production
- Implement proper error tracking and monitoring

---

## Collaboration

- Review for type safety, error handling, and documentation
- Test edge cases and consider performance
- Document decisions and keep the team informed
- Ask for help when needed and share knowledge

---

## Performance

- Minimize DOM operations
- Use proper event delegation
- Implement proper cleanup
- Monitor memory usage and profile performance
- Use efficient data structures and caching
- Optimize network requests
- Use debouncing/throttling where appropriate

---

## Code Style

- Use TypeScript for type safety
- Follow TypeScript strict mode
- Use meaningful variable and function names
- Keep functions small and focused
- Document complex logic with comments
- Use BEM naming for CSS and CSS variables for theming
- Use flexbox for layouts and responsive design patterns

---

## Architecture

- Keep the code modular and maintainable
- Separate concerns (UI, logic, data)
- Use interfaces for type definitions
- Keep dependencies minimal
- Follow the single responsibility principle
- Use event-driven design where appropriate

---

## UI/UX Guidelines

- Maintain consistent spacing and padding
- Use smooth animations for transitions
- Ensure responsive design
- Keep the interface simple and intuitive
- Follow accessibility best practices
- Add ARIA labels for interactive elements
- Improve keyboard navigation and screen reader support

---

## Security

- Sanitize user input
- Handle errors gracefully
- Keep sensitive data secure
- Follow security best practices
- Regular security audits
- Validate all user input
- Sanitize HTML output
- Implement proper CORS policies
- Use secure storage methods

---

## Proxy/Middleware & Static Hosting (GitHub Pages)

- **GitHub Pages is static-only**: It cannot run server-side code (like a proxy or middleware).
- If the app needs to call a backend API (e.g., to hide API keys, handle CORS, or add authentication), you **must deploy your proxy/middleware to a separate service** (such as Vercel, Netlify, Cloudflare Workers, etc.).
- Update the frontend code to call the deployed proxy endpoint (e.g., `https://your-proxy-service.com/api/chat`).
- **Never put API keys or secrets in the frontend code.**
- For local development, you can run the proxy locally and point your frontend to `http://localhost:PORT`.
- Document the proxy endpoint and configuration in the README.

---

## Development Process

- Use hot reloading for development
- Test changes in development server
- Document all significant changes
- Keep dependencies up to date
- Follow semantic versioning

---

## Contributing

- Fork the repository
- Create a feature branch
- Make your changes
- Submit a pull request

---

## License

MIT License - See LICENSE file for details 