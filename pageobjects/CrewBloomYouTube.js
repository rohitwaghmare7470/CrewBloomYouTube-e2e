class CrewBloomYouTube {
  constructor(page) {
    this.page = page;
    this.searchBox = page.locator("input[placeholder*='Search']");
    this.searchButton = page.locator("button[title='Search'] div");
    this.videoList = page.locator("yt-image[class='style-scope ytd-thumbnail'] img[class='ytCoreImageHost ytCoreImageFillParentHeight ytCoreImageFillParentWidth ytCoreImageContentModeScaleAspectFill ytCoreImageLoaded']");
    
    this.videoPlayer = page.locator("ytd-search-pyv-renderer[class='style-scope ytd-item-section-renderer']");
    this.videoTitle = page.locator("h1.title");
  }


  async navigate() {
    await this.page.goto('https://www.youtube.com/');
    await this.page.waitForLoadState('domcontentloaded');
  }

async search(keyword) {
  
  await this.searchBox.fill(keyword, { timeout: 10000 });
  await this.searchButton.hover({timeout: 1000 });
  
  await this.searchButton.waitFor({ state :'visible',timeout: 10000 });
;

  await this.page.waitForLoadState('domcontentloaded');
}

async clickFirstVideo() {
  // Hover over the first video result
  await this.videoList.count().then(async (count) => {
    if (count > 0) {
      await this.videoList.first().click({ timeout: 5000 });
    }
  // Click only the first video result
  
  await this.page.waitForLoadState('domcontentloaded');
  });
}

}

module.exports = CrewBloomYouTube;