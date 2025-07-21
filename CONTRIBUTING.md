# Contributing to Interactive Story Explorer

We love your input! We want to make contributing to Interactive Story Explorer as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Becoming a maintainer

## Development Process

We use GitHub to host code, to track issues and feature requests, as well as accept pull requests.

## Pull Requests

Pull requests are the best way to propose changes to the codebase. We actively welcome your pull requests:

1. Fork the repo and create your branch from `main`.
2. If you've added code that should be tested, add tests.
3. If you've changed APIs, update the documentation.
4. Ensure the test suite passes.
5. Make sure your code lints.
6. Issue that pull request!

## Any contributions you make will be under the MIT Software License

In short, when you submit code changes, your submissions are understood to be under the same [MIT License](http://choosealicense.com/licenses/mit/) that covers the project. Feel free to contact the maintainers if that's a concern.

## Report bugs using GitHub's issues

We use GitHub issues to track public bugs. Report a bug by [opening a new issue](https://github.com/yourusername/interactive-story-explorer/issues); it's that easy!

## Write bug reports with detail, background, and sample code

**Great Bug Reports** tend to have:

- A quick summary and/or background
- Steps to reproduce
  - Be specific!
  - Give sample code if you can
- What you expected would happen
- What actually happens
- Notes (possibly including why you think this might be happening, or stuff you tried that didn't work)

## Adding New Stories

Stories are one of the easiest ways to contribute! Here's how to add a new story:

1. Open `src/Components/InteractiveStoryApp.js`
2. Add your story to the `stories` array:

```javascript
{
  id: 6, // Next available ID
  title: "Your Story Title",
  icon: "🎭", // Choose an appropriate emoji
  difficulty: "Easy|Medium|Hard",
  content: `Your story content here...
  
  Multiple paragraphs are supported.
  Make sure to include the target words naturally in the story.`,
  targetWords: ['word1', 'word2', 'word3'], // Words players need to find
  color: "from-pink-400 to-purple-500", // Tailwind gradient classes
  quizQuestions: [ // Optional quiz questions
    {
      question: "What is the main character's name?",
      options: ["Option 1", "Option 2", "Option 3", "Option 4"],
      correct: 0 // Index of correct answer (0-3)
    }
  ]
}
```

### Story Guidelines

- **Age Appropriate**: Keep content suitable for children aged 6+
- **Educational Value**: Include vocabulary appropriate for the difficulty level
- **Engaging Plot**: Create interesting characters and scenarios
- **Target Words**: Choose 15-30 words that appear naturally in the story
- **Quiz Questions**: Write 2-4 comprehension questions per story

## Use a Consistent Coding Style

* Use 2 spaces for indentation rather than tabs
* Follow React best practices
* Use functional components with hooks
* Add comments for complex logic
* Use descriptive variable names

## License

By contributing, you agree that your contributions will be licensed under its MIT License.

## Getting Started with Development

1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm start`
4. Make your changes
5. Test thoroughly
6. Submit a pull request

## Code of Conduct

### Our Pledge

We as members, contributors, and leaders pledge to make participation in our community a harassment-free experience for everyone, regardless of age, body size, visible or invisible disability, ethnicity, sex characteristics, gender identity and expression, level of experience, education, socio-economic status, nationality, personal appearance, race, religion, or sexual identity and orientation.

### Our Standards

Examples of behavior that contributes to a positive environment:
- Using welcoming and inclusive language
- Being respectful of differing viewpoints and experiences
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

## Questions?

Don't hesitate to ask questions by opening an issue or reaching out to the maintainers!