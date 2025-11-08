const fs = require('fs');
const path = require('path');

class CrewBloomYouTube {
  constructor(page) {
    this.page = page;

    // Locators
    this.searchBox = page.locator("input[placeholder*='Search']");
    this.searchButton = page.locator("button[title='Search'] div");
    this.videoList = page.locator("yt-image[class='style-scope ytd-thumbnail'] img[class='ytCoreImageHost ytCoreImageFillParentHeight ytCoreImageFillParentWidth ytCoreImageContentModeScaleAspectFill ytCoreImageLoaded']");
    this.videoPlayer = page.locator(".video-stream.html5-main-video");
    this.videoTitle = page.locator("h1.title");
    this.skipAdButton = page.locator("button[id='skip-button:2']");
  }

  async navigate() {
    await this.page.goto('https://www.youtube.com/');
    await this.page.waitForLoadState('domcontentloaded');
  }

  async search(keyword) {
    await this.searchBox.fill(keyword, { timeout: 10000 });
    await this.searchButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.searchButton.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async clickFirstVideo() {
    const count = await this.videoList.count();
    if (count > 0) {
      await this.videoList.first().click({ timeout: 5000 });
      await this.page.waitForLoadState('domcontentloaded');
    } else {
      throw new Error('No video results found');
    }
  }

  async handleAdIfPresent() {
    try {
      await this.skipAdButton.waitFor({ state: 'visible', timeout: 15000 });
      console.log('Ad detected — clicking Skip Ad');
      await this.skipAdButton.click();
      await this.page.waitForTimeout(2000);
    } catch {
      console.log('No skippable ad detected — continuing');
    }
  }

  async getVideoTime() {
    return await this.page.evaluate(() => {
      const video = document.querySelector('video');
      return video ? video.currentTime : 0;
    });
  }

 async playPauseAndSmartSkip() {
  await this.handleAdIfPresent();

  await this.page.keyboard.press('k'); // toggle play/pause

  // Wait until video starts playing
  await this.page.waitForFunction(() => {
    const video = document.querySelector('video');
    return video && video.currentTime > 0;
  }, { timeout: 10000 });

  const currentTime = await this.getVideoTime();

  if (currentTime < 10) {
    console.log(`Current time is ${currentTime}s — skipping forward`);
    await this.page.keyboard.press('ArrowRight');
    await this.page.waitForTimeout(2000);
  } else {
    console.log(`Current time is ${currentTime}s — no skip needed`);
  }
}




  async getVideoTitle() {
    const titleElement = await this.videoTitle.first();
    return await titleElement.textContent();
  }

  async takeScreenshot(filename = 'video_playing.png') {
    const screenshotPath = path.join(__dirname, '..', 'screenshots', filename);
    await this.page.screenshot({ path: screenshotPath });
    return fs.existsSync(screenshotPath);
  }
}

module.exports = CrewBloomYouTube;