# Path Handling Documentation

## Overview

The AeroVista Album Player uses a path utility function to ensure all file paths work correctly on both local development and GitHub Pages deployment.

## Path Utility Function

The `getPath()` function normalizes all file paths to use relative paths without leading slashes or `./` prefixes:

```javascript
const getPath = (relativePath) => {
  // Remove leading slash or ./ if present
  const cleanPath = relativePath.replace(/^(\/|\.\/)/, '');
  // Return clean relative path (works for both local and GitHub Pages)
  return cleanPath;
};
```

## Path Format

All paths use the format: `directory/filename.ext`

Examples:
- ✅ `art/aerovista_effect_art.png`
- ✅ `audio/aerovista_effect.mp3`
- ✅ `visualizers/aerovista_effect_visualizer.html`

Not used:
- ❌ `/art/aerovista_effect_art.png` (absolute path)
- ❌ `./art/aerovista_effect_art.png` (relative with ./)
- ❌ `../art/aerovista_effect_art.png` (parent directory)

## Why This Works

### Local Development
When opening `index.html` directly or serving with a local server:
- Relative paths like `art/image.png` resolve correctly
- Browser resolves paths relative to the HTML file location

### GitHub Pages
When deployed to GitHub Pages:
- Relative paths work the same way
- No need for base path detection
- Works for both user sites (`username.github.io`) and project pages (`username.github.io/repo-name`)

## Usage

All file paths in the code use the `getPath()` function:

```javascript
// Images
img.src = getPath(`art/${t.key}_art.png`);

// Audio
source.src = getPath(`audio/${t.key}.mp3`);

// Visualizers
openVis.href = getPath(`visualizers/${t.key}_visualizer.html`);
```

## Testing

Path handling is tested in `tests/path-handling.spec.js`:
- Verifies path format (no leading slashes)
- Checks that paths resolve correctly
- Ensures images load successfully

## Troubleshooting

If paths aren't working:

1. **Check browser console** - Look for 404 errors
2. **Verify file structure** - Ensure files are in correct directories
3. **Check file names** - Must match exactly (case-sensitive on GitHub Pages)
4. **Test locally first** - Use `python -m http.server 8000` to test

## Best Practices

1. Always use `getPath()` for all file paths
2. Use relative paths, never absolute paths
3. Keep file names consistent (lowercase with underscores)
4. Test paths on both local and GitHub Pages

