# Testing Guide - AeroVista Album Player

## Overview

This project uses Playwright for end-to-end testing of the album player functionality.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Install Playwright browsers:
```bash
npx playwright install
```

## Running Tests

### Run all tests:
```bash
npm test
```

### Run tests with UI mode (interactive):
```bash
npm run test:ui
```

### Run tests in headed mode (see browser):
```bash
npm run test:headed
```

### Debug tests:
```bash
npm run test:debug
```

## Test Coverage

The test suite covers:

- ✅ Page loading and basic structure
- ✅ Track list display
- ✅ Image loading for track art
- ✅ Audio playback functionality
- ✅ Track navigation (next/prev)
- ✅ Track selection and active states
- ✅ Play/pause controls
- ✅ Visualizer link generation
- ✅ Track metadata display

## Test Structure

Tests are located in `tests/album-player.spec.js` and include:

1. **Page Load Tests**: Verify the page loads correctly
2. **Playlist Tests**: Check all tracks are displayed
3. **Image Tests**: Verify track art images load
4. **Audio Tests**: Test audio playback functionality
5. **Navigation Tests**: Test track navigation controls
6. **UI Tests**: Verify user interface elements work correctly

## Continuous Integration

The Playwright configuration is set up for CI environments with:
- Automatic retries on failure
- HTML test reports
- Trace collection for debugging

## Troubleshooting

If tests fail:

1. Check that the local server is running (tests start it automatically)
2. Verify all audio files are in the `audio/` directory
3. Verify all art files are in the `art/` directory
4. Check browser console for errors
5. Run tests in headed mode to see what's happening

