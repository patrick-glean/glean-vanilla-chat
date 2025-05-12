# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added
- Message buffer system for managing chat history
- Support for multiple message types (user, assistant, system)
- Real-time message status updates
- Message source tracking (glean, other, system)
- Event-based message update system
- Streaming API support with proper error handling
- Improved message parsing and display
- Better error handling for malformed responses
- Real-time streaming message support
- Streaming message callback in API utility
- Support for structured results and document references
- Improved message fragment handling
- Comprehensive TypeScript types for API responses
- Real-time message updates in chat window
- Better error handling for streaming responses

### Changed
- Moved API service to utils directory
- Updated API call format to match Glean backend
- Improved message handling with proper buffering
- Enhanced error handling and user feedback
- Updated documentation with new features
- Updated API utility to handle streaming responses
- Improved message processing in chat component
- Enhanced TypeScript type definitions
- Updated documentation with streaming features

### Fixed
- Message parsing issues with streaming responses
- Error handling for malformed API responses
- Message status updates during streaming
- API endpoint path construction
- Token management issues
- UI responsiveness
- Error handling
- Type safety

## [0.1.0] - 2024-03-19

### Added
- Initial project setup with TypeScript
- Modular project structure
- Token management system
- Basic chat interface
- Configuration panel
- Build system with npm scripts
- TypeScript type safety
- Error handling
- Responsive UI
- Documentation

### Changed
- Improved project organization
- Enhanced error handling
- Better type safety
- More responsive UI

### Fixed
- Token management issues
- UI responsiveness
- Error handling
- Type safety

## [Initial Setup]
- Basic chat application structure
- TypeScript configuration
- Development environment setup
- Basic styling and layout

### Added
- Initial project setup with TypeScript
- Basic chat interface with three stacked boxes
- Message history tracking
- Welcome message animation
- Hot reloading support
- GitHub Pages deployment configuration
- Automated screenshot generation for README
- Live demo link in README
- REST API integration with service layer
- API configuration management
- Error handling for API requests
- Message history loading from API
- Error message styling and animations
- API token management component
- Token input and storage functionality
- Bearer token authentication
- Token-related error handling
- Token UI styling and animations

### Structure
- Header box: Contains the chat title
- Message box: Displays chat history with scrolling
- Input box: Contains message input and send button

### Features
- Real-time message updates
- Message history tracking with timestamps
- Animated welcome message
- Responsive design
- Easy embedding capability
- Hot reloading for development
- Automated documentation with screenshots

### Technical Decisions
- Using vanilla TypeScript for minimal dependencies
- ES2020 as target for modern JavaScript features
- Modular architecture for easy extension
- CSS animations for smooth transitions
- Local state management for message history
- GitHub Pages for free hosting
- Puppeteer for automated screenshots
- Used fetch API for HTTP requests
- Implemented timeout handling
- Added proper error types and handling
- Used environment variables for configuration
- Used localStorage for token persistence
- Implemented secure token input with password type
- Added token validation before API calls
- Created separate token manager component

### Infrastructure
- Hot reloading with nodemon
- TypeScript compilation
- Automated build process
- GitHub Pages deployment
- Screenshot generation for documentation

### Next Steps
- Add message persistence
- Implement real API integration
- Add typing indicators
- Improve error handling
- Add message search functionality
- Add unit tests
- Add CI/CD pipeline 