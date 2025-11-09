# AeroVista – Division Album Player

Self-contained HTML player + per-track visualizers.

## Quick Start

1. Open `index.html` in a browser to play
2. Or serve locally: `python -m http.server 8000`

## File Structure

Put MP3s into `audio/` with these names:
- `aerovista_effect.mp3`
- `lines_of_power.mp3`
- `worlds_awake.mp3`
- `high_mind_rises.mp3`
- `sub_below_sea_level.mp3`
- `glow_hustle.mp3`
- `midnight_signals.mp3`
- `eye_in_the_sky.mp3`

Put art PNGs into `art/` with these names:
- `aerovista_effect_art.png`
- `lines_of_power_art.png`
- (same pattern for all tracks)

## Testing

This project uses Playwright for end-to-end testing.

### Setup
```bash
npm install
npx playwright install
```

### Run Tests
```bash
npm test              # Run all tests
npm run test:ui       # Interactive UI mode
npm run test:headed   # See browser while testing
npm run test:debug    # Debug mode
```

See [docs/testing.md](docs/testing.md) for detailed testing guide.

## Documentation

- [Testing Guide](docs/testing.md) - Playwright testing documentation
- [Curriculum Guide](docs/curriculum.md) - Learning objectives and concepts

## Features

- ✅ HTML5 audio player
- ✅ Track navigation (prev/next)
- ✅ Play/pause controls
- ✅ Auto-play next track
- ✅ Individual track visualizers
- ✅ Responsive design
- ✅ GitHub Pages compatible
- ✅ Playwright test coverage
