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

  //test.soft.expect(await page.title()).toContain('YouTube');
  expect.soft(await page.title(), 'Page title should contain YouTube').toContain('YouTube');
// Step 2: Searching for a keyword
  await crewbloomyoutube.navigate();
  await crewbloomyoutube.search('QA automation');
  await crewbloomyoutube.searchButton.click();
await page.waitForTimeout(3000);


  // Step 3: Click on the first video link
  await crewbloomyoutube.clickFirstVideo();
  const videoCount = await crewbloomyoutube.videoList.count();
  expect.soft(videoCount, 'Expected at least one video result').toBeGreaterThan(0);
  //video count validation failed
 //await test.soft.expect(count, 'Expected at least one video result').toBeGreaterThan(0);

 const timeBefore = await crewbloomyoutube.getVideoTime();
  await crewbloomyoutube.page.waitForTimeout(2000);
  await crewbloomyoutube.page.keyboard.press('ArrowRight');
  await crewbloomyoutube.page.waitForTimeout(2000);
  const timeAfter = await crewbloomyoutube.getVideoTime();
  expect.soft(timeAfter).toBeGreaterThan(timeBefore);

 await crewbloomyoutube.playPauseAndSmartSkip();

 

  const screenshotTaken = await crewbloomyoutube.takeScreenshot();
  expect.soft(screenshotTaken).toBe(true);

  const title = await crewbloomyoutube.getVideoTitle();
  expect.soft(title.trim().length).toBeGreaterThan(0);


  crewbloomyoutube.handleAdIfPresent();
  crewbloomyoutube.getVideoTime();
  crewbloomyoutube.playPauseAndSmartSkip();
  

  //await browser.close();



 
});