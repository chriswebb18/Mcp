# Contributing to LinkedIn MCP

Thank you for considering contributing to the LinkedIn MCP project! This document provides guidelines and instructions for contributing.

## Code of Conduct

Please be respectful and considerate in all interactions related to this project.

## How to Contribute

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes
4. Run tests to ensure your changes don't break existing functionality
5. Commit your changes: `git commit -m 'Add some feature'`
6. Push to your branch: `git push origin feature/your-feature-name`
7. Create a Pull Request

## Development Setup

1. Clone the repository:
   ```
   git clone https://github.com/chriswebb18/Mcp.git
   cd Mcp
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Configure your environment:
   ```
   cp .env.example .env
   ```
   Edit the `.env` file to add your LinkedIn API credentials.

4. Start the development server:
   ```
   npm run dev
   ```

## Testing

Run tests with:
```
npm test
```

## Coding Standards

- Follow existing code style
- Write comments for new functions and complex logic
- Include tests for new features

## Pull Request Process

1. Update the README.md with details of any interface changes
2. Update the tasklist.md when completing tasks
3. The PR should work correctly on the latest Node.js LTS version
4. PR will be merged once it passes reviews and tests

## License

By contributing, you agree that your contributions will be licensed under the project's MIT License.