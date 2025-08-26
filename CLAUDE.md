# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a Cypress course for beginners, structured as a comprehensive educational resource with 18 lessons covering end-to-end testing fundamentals. The repository contains multilingual lesson content (English, Czech, Russian, Ukrainian) and practical exercises for learning Cypress testing framework.

## Course Structure

### Lesson Organization
- Each lesson is located in `lessons/lesson-{number}/` directory
- Lesson content is provided in 4 languages:
  - `EN-lesson.md` - English
  - `CZ-lekce.md` - Czech  
  - `RU-обучать.md` - Russian
  - `UA-лекція.md` - Ukrainian
- Most lessons include an `exercise/` subdirectory with practical code examples

### Exercise Types by Technology Stack

**Static HTML/CSS/JavaScript Exercises:**
- Lessons 2, 3, 4, 5, 6, 7, 8, 9, 10, 16, 17
- Simple HTML files with basic JavaScript functionality
- Some include Cypress test files (`.cy.js`) for hands-on testing practice

**Vue.js + Vite Applications:**
- Lessons 12, 13, 14
- Standard Vue 3 projects with Vite build system
- Run with: `npm run dev` (development), `npm run build` (production)
- Lesson 12 includes environment-specific modes: development, staging, production

**Nuxt.js Applications:**
- Lessons 11, 15
- Nuxt 3 applications with server-side API routes
- Run with: `npm run dev`, build with: `npm run build`
- Lesson 15 includes API endpoints in `server/api/` directory

## Common Development Commands

### For Vue.js + Vite Projects (lessons 12, 13, 14):
```bash
npm install          # Install dependencies
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

### For Nuxt.js Projects (lessons 11, 15):
```bash
npm install          # Install dependencies
npm run dev          # Start development server
npm run build        # Build for production
npm run generate     # Generate static site
npm run preview      # Preview generated site
```

### For Cypress Testing:
- Cypress is included as a dependency in relevant lesson exercises
- Test files follow naming convention: `*.cy.js`
- Tests are typically located in `exercise/cypress/` directories
- No global Cypress configuration exists - each lesson exercise is self-contained

## Key Architecture Patterns

### Lesson Progression
1. **Lessons 1-2:** Course introduction, Node.js and development environment setup
2. **Lessons 3-5:** Basic Cypress testing concepts with static HTML exercises
3. **Lessons 6-10:** Advanced Cypress features and DOM interaction patterns
4. **Lessons 11-15:** Modern framework integration (Vue.js, Nuxt.js) with Cypress
5. **Lessons 16-18:** Advanced testing scenarios and course conclusion

### Exercise Structure
- Each exercise is a standalone project with its own dependencies
- No shared configuration or utilities across lessons
- Students learn by building from simple HTML to complex Vue/Nuxt applications
- Emphasis on practical, hands-on learning with real code examples

## Development Notes

- The repository uses Windows-style file paths in the current environment
- Node.js and npm are the primary package managers used throughout exercises
- Course content focuses on practical Cypress testing skills rather than complex application development
- Multilingual support requires maintaining consistency across all 4 language versions when making content updates

## Working with Lesson Exercises

When modifying or testing lesson exercises:
1. Navigate to the specific lesson's exercise directory
2. Run `npm install` to install dependencies
3. Use the appropriate development command based on the technology stack
4. Cypress tests can be run directly from exercise directories where present
5. Each exercise is designed to be independent and self-contained