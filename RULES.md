# Development Rules and Guidelines

## Code Organization

### Directory Structure
- Keep all source code in `src/`
- Group related components in subdirectories
- Use clear, descriptive file names
- Follow the established module pattern:
  ```
  src/
  ├── components/    # UI Components
  ├── services/      # Business Logic
  ├── types/         # Type Definitions
  └── utils/         # Helper Functions
  ```

### File Naming
- Use kebab-case for file names: `config-panel.ts`
- Use PascalCase for class names: `ConfigPanel`
- Use camelCase for variables and functions: `getToken()`
- Use UPPER_SNAKE_CASE for constants: `API_BASE_URL`

## TypeScript Guidelines

### Type Safety
- Always define types for function parameters and return values
- Use interfaces for object structures
- Avoid `any` type - use `unknown` if type is truly unknown
- Use type guards for runtime type checking

### Class Structure
```typescript
class Example {
    // 1. Private properties
    private readonly property: string;
    
    // 2. Public properties
    public readonly publicProperty: string;
    
    // 3. Constructor
    constructor() {
        // Initialize properties
    }
    
    // 4. Private methods
    private helperMethod(): void {
        // Implementation
    }
    
    // 5. Public methods
    public publicMethod(): void {
        // Implementation
    }
}
```

## Component Guidelines

### UI Components
- Keep components focused and single-responsibility
- Use proper TypeScript types for props and state
- Implement proper error handling
- Add loading states where appropriate
- Use semantic HTML elements
- Follow accessibility guidelines

### State Management
- Use localStorage for persistent data
- Keep state as close to usage as possible
- Use proper TypeScript types for state
- Implement proper state initialization
- Handle state updates safely

## API Guidelines

### Service Layer
- Keep API calls in dedicated service files
- Use proper error handling
- Implement retry logic where appropriate
- Use proper TypeScript types for requests/responses
- Handle authentication consistently

### Error Handling
```typescript
try {
    // API call
} catch (error) {
    if (error instanceof ApiError) {
        // Handle specific API error
    } else {
        // Handle unexpected error
    }
}
```

## Testing Guidelines

### Code Quality
- Write unit tests for business logic
- Test error cases
- Test edge cases
- Use proper test naming:
  ```typescript
  describe('ComponentName', () => {
      it('should do something specific', () => {
          // Test implementation
      });
  });
  ```

## Documentation

### Code Comments
- Use JSDoc for public methods
- Explain complex logic
- Document edge cases
- Keep comments up to date

### README Updates
- Update README for new features
- Document breaking changes
- Keep installation instructions current
- Update examples

## Git Workflow

### Commits
- Use semantic commit messages
- Keep commits focused and atomic
- Reference issues in commit messages
- Format: `type(scope): description`

### Branching
- Use feature branches for new features
- Use bugfix branches for fixes
- Keep branches up to date with main
- Delete merged branches

## Build and Deployment

### Development
- Keep build process simple
- Use proper environment variables
- Handle different environments
- Keep dependencies up to date

### Production
- Minify and optimize code
- Handle environment-specific config
- Implement proper error tracking
- Monitor performance

## Collaboration

### Code Review
- Review for type safety
- Check error handling
- Verify documentation
- Test edge cases
- Consider performance

### Communication
- Document decisions
- Keep team informed
- Ask for help when needed
- Share knowledge

## Performance

### Optimization
- Minimize DOM operations
- Use proper event delegation
- Implement proper cleanup
- Monitor memory usage
- Profile performance

### Best Practices
- Use proper data structures
- Implement proper caching
- Handle large datasets
- Optimize network requests
- Use proper debouncing/throttling

## Code Style
- Use TypeScript for type safety
- Follow TypeScript strict mode
- Use meaningful variable and function names
- Keep functions small and focused
- Document complex logic with comments

## Architecture
- Keep the code modular and maintainable
- Separate concerns (UI, logic, data)
- Use interfaces for type definitions
- Keep dependencies minimal
- Follow the single responsibility principle

## UI/UX Guidelines
- Maintain consistent spacing and padding
- Use smooth animations for transitions
- Ensure responsive design
- Keep the interface simple and intuitive
- Follow accessibility best practices

## State Management
- Track message history in memory
- Use timestamps for message ordering
- Keep UI state separate from data state
- Implement proper error handling
- Plan for future persistence needs

## Development Process
- Use hot reloading for development
- Test changes in development server
- Document all significant changes
- Keep dependencies up to date
- Follow semantic versioning

## Deployment
- Use GitHub Pages for hosting
- Build process should be automated
- Keep deployment process simple
- Maintain separate development and production builds
- Document deployment steps

## Security
- Sanitize user input
- Handle errors gracefully
- Keep sensitive data secure
- Follow security best practices
- Regular security audits

## Performance
- Optimize animations
- Minimize DOM operations
- Use efficient data structures
- Implement proper cleanup
- Monitor performance metrics 