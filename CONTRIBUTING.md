# Contributing to Dara

Thank you for your interest in contributing to Dara! We welcome contributions from developers of all experience levels. This guide will help you get started with contributing to our AI-powered document processing platform.

## 🌟 Ways to Contribute

### 🐛 Bug Reports
- Report bugs and issues you encounter
- Provide detailed reproduction steps
- Include system information and error messages

### 💡 Feature Requests  
- Suggest new features and improvements
- Explain the use case and benefits
- Provide examples or mockups when helpful

### 📖 Documentation
- Improve existing documentation
- Add missing documentation
- Fix typos and grammar errors
- Translate documentation

### 🔧 Code Contributions
- Fix bugs and implement features
- Improve performance and optimization
- Add tests and improve test coverage
- Refactor and clean up code

## 🚀 Getting Started

### Prerequisites
- **Node.js** v20.0.0 or higher
- **npm** v10.0.0 or higher
- **Git** (latest version)
- **Cohere AI API Key** for testing

### 1. Fork and Clone
```bash
# Fork the repository on GitHub, then clone your fork
git clone https://github.com/your-username/dara.git
cd dara

# Add upstream remote
git remote add upstream https://github.com/oovaa/dara.git
```

### 2. Environment Setup
```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Add your API key and configuration
nano .env
```

### 3. Development Workflow
```bash
# Create a new feature branch
git checkout -b feature/your-feature-name

# Start development server
npm run dev

# Make your changes and test them
# ...

# Format code before committing
npm run lint
```

## 📋 Development Guidelines

### 🎯 Code Style
- **ES6+ JavaScript**: Use modern JavaScript features
- **Consistent naming**: Use camelCase for variables and functions
- **Clear comments**: Add comments for complex logic
- **Error handling**: Implement proper error handling
- **Security**: Follow security best practices

### 📝 Commit Messages
Use conventional commit format:
```
type(scope): description

[optional body]

[optional footer]
```

**Types**:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, semicolons, etc.)
- `refactor`: Code refactoring
- `test`: Adding or modifying tests
- `chore`: Build process or auxiliary tool changes

**Examples**:
```bash
feat(api): add document answer generation endpoint
fix(parser): handle malformed PDF files gracefully
docs(readme): update installation instructions
test(controllers): add unit tests for summary controller
```

### 🧪 Testing
```bash
# Run existing tests (when available)
npm test

# Test your changes manually
curl -X POST http://localhost:3000/api/sum -F 'file=@test.txt'

# Test different file formats
# - PDF files
# - DOCX documents  
# - PPTX presentations
# - TXT files
```

### 📁 File Organization
```
server/
├── controllers/     # HTTP request handlers
├── middlewares/     # Express middleware functions  
├── routes/         # Route definitions
└── utils/          # Server-specific utilities

utils/              # Shared utilities
├── model.js        # AI model configuration
└── parser.js       # Document parsing logic

tools/              # Processing scripts
docs/               # Documentation
```

## 🔍 Pull Request Process

### 1. Before Submitting
- [ ] Test your changes thoroughly
- [ ] Update documentation if needed
- [ ] Format code with `npm run lint`
- [ ] Write clear commit messages
- [ ] Update CHANGELOG.md (if exists)

### 2. Pull Request Template
When creating a PR, include:

```markdown
## Description
Brief description of changes made.

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## Testing
- [ ] I have tested my changes locally
- [ ] I have added tests that prove my fix is effective or that my feature works
- [ ] New and existing unit tests pass locally with my changes

## Checklist
- [ ] My code follows the style guidelines of this project
- [ ] I have performed a self-review of my own code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
```

### 3. Review Process
1. **Automated checks**: CI/CD pipeline runs tests
2. **Code review**: Maintainers review your code
3. **Feedback**: Address any requested changes
4. **Approval**: PR gets approved and merged

## 🐛 Bug Reports

### Bug Report Template
```markdown
**Describe the bug**
A clear and concise description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected behavior**
A clear description of what you expected to happen.

**Screenshots**
If applicable, add screenshots to help explain your problem.

**Environment:**
- OS: [e.g. Ubuntu 22.04]
- Node.js version: [e.g. v20.1.0]
- npm version: [e.g. v10.0.0]
- Browser: [e.g. Chrome 120.0]

**Additional context**
Add any other context about the problem here.
```

## 💡 Feature Requests

### Feature Request Template
```markdown
**Is your feature request related to a problem?**
A clear description of what the problem is. Ex. I'm always frustrated when [...]

**Describe the solution you'd like**
A clear description of what you want to happen.

**Describe alternatives you've considered**
Alternative solutions or features you've considered.

**Additional context**
Add any other context or screenshots about the feature request here.

**Implementation ideas**
If you have ideas on how to implement this feature, please share them.
```

## 🏗️ Architecture Guidelines

### Adding New Endpoints
1. Create route in `server/routes/`
2. Add controller in `server/controllers/`
3. Add middleware if needed
4. Update documentation
5. Add tests

### Adding New File Parsers
1. Extend `utils/parser.js`
2. Add new file type support
3. Update allowed file types
4. Test with various file formats
5. Update documentation

### AI Model Integration
1. Modify `utils/model.js` for new models
2. Update environment variables
3. Test with different providers
4. Document configuration changes

## 📚 Documentation Standards

### API Documentation
- Use clear, descriptive endpoint names
- Include request/response examples
- Document all parameters and responses
- Add error codes and messages

### Code Documentation
- JSDoc comments for functions
- Inline comments for complex logic
- README updates for new features
- Architecture documentation updates

## 🤝 Community Guidelines

### Code of Conduct
- **Be respectful**: Treat all community members with respect
- **Be inclusive**: Welcome newcomers and diverse perspectives
- **Be constructive**: Provide helpful feedback and suggestions
- **Be patient**: Remember that people have different experience levels

### Communication
- **GitHub Issues**: For bug reports and feature requests
- **Pull Requests**: For code discussions and reviews
- **Discussions**: For general questions and ideas

## 🎯 Priority Areas

We especially welcome contributions in these areas:

### High Priority
- [ ] Performance optimizations
- [ ] Additional file format support
- [ ] Enhanced error handling
- [ ] Security improvements

### Medium Priority  
- [ ] UI/UX improvements
- [ ] Additional AI model support
- [ ] Caching implementation
- [ ] Rate limiting enhancements

### Documentation
- [ ] API examples and tutorials
- [ ] Architecture diagrams
- [ ] Deployment guides
- [ ] Troubleshooting guides

## 🏆 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes for significant contributions
- GitHub contributors graph
- Special mentions for exceptional contributions

## 📞 Getting Help

### Development Support
- **GitHub Issues**: Technical questions and problems
- **GitHub Discussions**: General questions and ideas
- **Documentation**: Comprehensive guides and references

### Maintainer Contact
- Create an issue for technical questions
- Use discussions for general inquiries
- Follow up on existing issues for updates

## 📈 Development Roadmap

### Upcoming Features
- Enhanced AI model support
- Real-time processing capabilities
- Advanced document analysis
- Multi-language support
- Plugin architecture

### Technical Improvements
- Performance optimizations
- Enhanced security features
- Better error handling
- Comprehensive testing suite

---

Thank you for contributing to Dara! Your contributions help make this project better for everyone. 🚀
