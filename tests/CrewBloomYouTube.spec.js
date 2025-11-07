const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');
const CrewBloomYouTube = require('../pageobjects/CrewBloomYouTube');

test('@YouTube end-to-end video flow', async ({ page }) => {
  const crewbloomyoutube = new CrewBloomYouTube(page);
  const screenshotDir = path.resolve(__dirname, '../screenshots');
  const screenshotPath = path.join(screenshotDir, 'video_playing.png');

  // Ensure screenshot folder exists
  if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir);

  // Step 1: Navigate to YouTube
  await crewbloomyoutube.navigate();
  await expect(page).toHaveURL(/youtube\.com/);

 
});