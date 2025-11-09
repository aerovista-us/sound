import { test, expect } from '@playwright/test';

test.describe('Path Handling', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/index.html');
  });

  test('should use correct paths for images', async ({ page }) => {
    await page.waitForSelector('.track img', { timeout: 5000 });
    
    const images = page.locator('.track img');
    const count = await images.count();
    expect(count).toBeGreaterThan(0);

    // Check that all images have correct path format
    for (let i = 0; i < count; i++) {
      const src = await images.nth(i).getAttribute('src');
      expect(src).toMatch(/^art\/[a-z_]+_art\.png$/);
      expect(src).not.toMatch(/^\/art\//); // Should not start with /
      expect(src).not.toMatch(/^\.\/art\//); // Should not start with ./
    }
  });

  test('should use correct paths for audio', async ({ page }) => {
    // Click first track
    await page.locator('.track').first().click();
    await page.waitForTimeout(1000);
    
    // Check audio source path
    const audioSrc = await page.locator('#src').getAttribute('src');
    expect(audioSrc).toMatch(/^audio\/[a-z_]+\.mp3$/);
    expect(audioSrc).not.toMatch(/^\/audio\//); // Should not start with /
    expect(audioSrc).not.toMatch(/^\.\/audio\//); // Should not start with ./
  });

  test('should use correct paths for visualizers', async ({ page }) => {
    // Click first track
    await page.locator('.track').first().click();
    await page.waitForTimeout(500);
    
    // Check visualizer link path
    const visHref = await page.locator('#openVis').getAttribute('href');
    expect(visHref).toMatch(/^visualizers\/[a-z_]+_visualizer\.html$/);
    expect(visHref).not.toMatch(/^\/visualizers\//); // Should not start with /
    expect(visHref).not.toMatch(/^\.\/visualizers\//); // Should not start with ./
  });

  test('should load images successfully', async ({ page }) => {
    await page.waitForSelector('.track img', { timeout: 5000 });
    
    const images = page.locator('.track img');
    const count = await images.count();
    expect(count).toBeGreaterThan(0);
    
    // Check that at least one image loads successfully
    const firstImage = images.first();
    await page.waitForTimeout(1000); // Wait for images to load
    
    // Check if image loaded (not showing error placeholder)
    const src = await firstImage.getAttribute('src');
    if (!src.startsWith('data:')) {
      // Image should be loaded
      const naturalWidth = await firstImage.evaluate(el => el.naturalWidth);
      expect(naturalWidth).toBeGreaterThan(0);
    }
  });
});

