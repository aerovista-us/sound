import { test, expect } from '@playwright/test';

test.describe('AeroVista Album Player', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/index.html');
  });

  test('should load the main page', async ({ page }) => {
    await expect(page.locator('header')).toContainText('AeroVista');
    await expect(page.locator('#playlist')).toBeVisible();
  });

  test('should display all tracks in playlist', async ({ page }) => {
    const tracks = [
      'AeroVista Effect',
      'Lines of Power',
      'Worlds Awake',
      'High Mind Rises',
      'Sub Below Sea Level',
      'Glow Hustle',
      'Midnight Signals',
      'Eye in the Sky'
    ];

    for (const track of tracks) {
      await expect(page.locator('text=' + track)).toBeVisible();
    }
  });

  test('should load track images', async ({ page }) => {
    // Wait for playlist to render
    await page.waitForSelector('.track img', { timeout: 5000 });
    
    // Check that images are loaded (not showing placeholder)
    const images = page.locator('.track img');
    const count = await images.count();
    expect(count).toBeGreaterThan(0);

    // Check first image loads
    const firstImage = images.first();
    await expect(firstImage).toHaveAttribute('src', /art\/.*_art\.png/);
  });

  test('should play audio when track is clicked', async ({ page }) => {
    // Click on first track
    await page.locator('.track').first().click();
    
    // Wait for audio to load
    await page.waitForTimeout(1000);
    
    // Check that audio source is set
    const audioSrc = await page.locator('#src').getAttribute('src');
    expect(audioSrc).toMatch(/audio\/.*\.mp3/);
  });

  test('should navigate between tracks', async ({ page }) => {
    // Get initial track title
    const initialTitle = await page.locator('#title').textContent();
    
    // Click next button
    await page.locator('#next').click();
    await page.waitForTimeout(500);
    
    // Title should change
    const newTitle = await page.locator('#title').textContent();
    expect(newTitle).not.toBe(initialTitle);
    
    // Click prev button
    await page.locator('#prev').click();
    await page.waitForTimeout(500);
    
    // Should be back to initial
    const backTitle = await page.locator('#title').textContent();
    expect(backTitle).toBe(initialTitle);
  });

  test('should update track art when track changes', async ({ page }) => {
    // Get initial art src
    const initialArt = await page.locator('#art').getAttribute('src');
    
    // Click next track
    await page.locator('#next').click();
    await page.waitForTimeout(500);
    
    // Art should change
    const newArt = await page.locator('#art').getAttribute('src');
    expect(newArt).not.toBe(initialArt);
    expect(newArt).toMatch(/art\/.*_art\.png/);
  });

  test('should have play/pause button functionality', async ({ page }) => {
    // Click first track to load audio
    await page.locator('.track').first().click();
    await page.waitForTimeout(1000);
    
    // Click play/pause button
    const playPauseButton = page.locator('#playpause');
    await playPauseButton.click();
    await page.waitForTimeout(500);
    
    // Button should be clickable
    await expect(playPauseButton).toBeEnabled();
  });

  test('should open visualizer link', async ({ page }) => {
    // Click first track
    await page.locator('.track').first().click();
    await page.waitForTimeout(500);
    
    // Check visualizer link
    const visLink = page.locator('#openVis');
    const href = await visLink.getAttribute('href');
    expect(href).toMatch(/visualizers\/.*_visualizer\.html/);
  });

  test('should handle track selection and active state', async ({ page }) => {
    // Get all tracks
    const tracks = page.locator('.track');
    const count = await tracks.count();
    expect(count).toBeGreaterThan(0);
    
    // First track should be active initially
    await expect(tracks.first()).toHaveClass(/active/);
    
    // Click second track
    await tracks.nth(1).click();
    await page.waitForTimeout(500);
    
    // Second track should be active
    await expect(tracks.nth(1)).toHaveClass(/active/);
  });

  test('should display track metadata correctly', async ({ page }) => {
    // Click first track
    await page.locator('.track').first().click();
    await page.waitForTimeout(500);
    
    // Check title and subtitle are displayed
    const title = await page.locator('#title').textContent();
    const subtitle = await page.locator('#subtitle').textContent();
    
    expect(title).not.toBe('—');
    expect(subtitle).not.toBe('Select a track to play.');
    expect(subtitle.length).toBeGreaterThan(0);
  });
});

