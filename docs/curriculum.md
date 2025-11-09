# AeroVista Album Player - Curriculum & Learning Guide

## Project Overview

The AeroVista Album Player is a self-contained HTML5 audio player with visualizers for each track. This project demonstrates:

- Modern JavaScript (ES6+)
- HTML5 Audio API
- DOM manipulation
- Event handling
- Responsive CSS Grid layouts
- Playwright end-to-end testing

## Learning Objectives

### 1. HTML5 Audio Player
- Understanding the `<audio>` element
- Working with audio sources and formats
- Handling audio events (play, pause, ended)
- Managing audio state

### 2. JavaScript DOM Manipulation
- Selecting elements with `querySelector`
- Creating and appending DOM elements
- Updating element attributes and content
- Event listeners and handlers

### 3. CSS Grid Layout
- Creating responsive layouts with CSS Grid
- Grid template columns and rows
- Aligning and spacing grid items
- Responsive design principles

### 4. Testing with Playwright
- Setting up Playwright test framework
- Writing end-to-end tests
- Testing user interactions
- Verifying UI state changes

## Key Concepts

### Track Management
The player manages a list of tracks with:
- Track metadata (title, subtitle, key)
- Associated audio files
- Art images
- Visualizer pages

### State Management
The player maintains:
- Current track index
- Audio playback state
- Active track highlighting
- Auto-play settings

### File Structure
```
├── index.html          # Main player interface
├── audio/              # MP3 audio files
├── art/                # Track art images
├── visualizers/        # Individual track visualizers
├── tests/               # Playwright test files
└── docs/               # Documentation
```

## Development Workflow

1. **Setup**: Install dependencies and Playwright
2. **Development**: Make changes to HTML/CSS/JS
3. **Testing**: Run Playwright tests to verify functionality
4. **Debugging**: Use test UI mode to debug issues
5. **Deployment**: Push to GitHub Pages

## Best Practices

- Use relative paths for assets (works on GitHub Pages)
- Handle errors gracefully (image/audio loading failures)
- Test all user interactions
- Maintain consistent file naming conventions
- Document code changes

## Next Steps

- Add more visualizations
- Implement audio visualization with Web Audio API
- Add keyboard shortcuts
- Implement playlist saving
- Add track search/filter functionality

