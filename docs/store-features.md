# Store Attention-Drawing Features

## Overview

The store prototype now includes several subtle, non-intrusive features that draw attention to merchandise without interrupting the listening experience.

## Features

### 1. 🏷️ Shop Badge on Tracks
- **Location**: Small badge appears on tracks in the playlist that have merchandise
- **Behavior**: 
  - Only visible when track is active/playing
  - Subtle pulsing animation to draw attention
  - Shows 🛍️ icon
- **Purpose**: Users can see at a glance which tracks have merchandise available

### 2. 📍 Tab Badge
- **Location**: Badge on the "Shop" tab in the sidebar
- **Behavior**:
  - Shows number of items available for the currently playing track
  - Pulsing animation when items are available
  - Only appears when current track has merchandise
- **Purpose**: Indicates there are items to browse without being intrusive

### 3. 💡 Contextual Suggestion
- **Location**: Overlay at the bottom of the album art area
- **Behavior**:
  - Appears after 3 seconds of playback (if track has merchandise)
  - Shows first available item with image, title, and price
  - "Buy Now" button for quick purchase
  - Can be dismissed with X button
  - Subtle slide-up animation
- **Purpose**: Shows relevant merchandise while user is engaged with the track

### 4. 🔔 Notification Banner
- **Location**: Top center of the screen
- **Behavior**:
  - Appears after 5 seconds of playback (if track has merchandise)
  - Non-intrusive banner with message
  - "Shop Now" link to open shop tab
  - Auto-dismisses after 8 seconds
  - Can be manually closed
- **Purpose**: Gentle reminder that merchandise is available

### 5. 🛍️ Floating Shop Button
- **Location**: Fixed position, bottom-right corner
- **Behavior**:
  - Appears after 8 seconds of playback (if track has merchandise)
  - Circular button with shop icon
  - Pulsing glow animation
  - Clicking opens the shop tab
  - Always accessible while browsing
- **Purpose**: Persistent, easy access to shop without interrupting playback

## Timing Strategy

The features appear in a staggered sequence to avoid overwhelming the user:

1. **0-3 seconds**: User is getting into the track
2. **3 seconds**: Contextual suggestion appears (subtle, in the art area)
3. **5 seconds**: Notification banner appears (gentle reminder)
4. **8 seconds**: Floating button appears (persistent access)

This creates a natural progression that doesn't feel pushy.

## User Control

All features respect user preferences:
- **Dismissible**: Users can close suggestions and notifications
- **Non-blocking**: Nothing interrupts playback
- **Context-aware**: Only shows for tracks that have merchandise
- **Resets**: Features reset when track changes

## Technical Details

### Track Association
Items can be associated with specific tracks using the `trackKey` property:
```javascript
{
  id: 'item-id',
  trackKey: 'aerovista_effect', // Links to specific track
  // ... other properties
}
```

Items with `trackKey: null` are available for all tracks.

### Feature Detection
The system automatically detects which tracks have merchandise:
- Checks `storeItems` array for matching `trackKey`
- Updates badges and suggestions accordingly
- Only activates features when merchandise exists

### State Management
- Features reset when track changes
- Dismissals are tracked per track
- Timeouts are cleared when playback pauses
- Features only show during active playback

## Customization

### Timing
Adjust the delays in `resetAttentionFeatures()`:
```javascript
suggestionTimeout = setTimeout(() => { ... }, 3000);  // 3 seconds
notificationTimeout = setTimeout(() => { ... }, 5000); // 5 seconds
floatingButtonTimeout = setTimeout(() => { ... }, 8000); // 8 seconds
```

### Styling
All features use CSS variables and can be customized:
- Colors match track-specific themes
- Animations are subtle and smooth
- Responsive design for mobile

### Behavior
- Disable specific features by commenting out their timeouts
- Adjust auto-dismiss times
- Change which item appears in contextual suggestion

## Best Practices

1. **Don't Overwhelm**: Features appear gradually, not all at once
2. **Respect User**: All features are dismissible
3. **Context Matters**: Only show for tracks with merchandise
4. **Non-Intrusive**: Nothing blocks or interrupts playback
5. **Visual Consistency**: Matches existing design language

## Future Enhancements

Potential additions:
- User preference to disable specific features
- Analytics to track which features drive purchases
- A/B testing different timing strategies
- Personalized suggestions based on listening history
- Social proof (e.g., "5 people bought this while listening")

