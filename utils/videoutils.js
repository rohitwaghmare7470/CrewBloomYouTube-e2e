module.exports = {
  async getVideoTime(page) {
    return await page.evaluate(() => {
      const video = document.querySelector('video');
      return video ? video.currentTime : 0;
    });
  },


    async waitForVideoToStart(page, timeout = 10000) {
    await page.waitForFunction(() => {
      const video = document.querySelector('video');
      return video && video.currentTime > 0;
    }, { timeout });
  },

async togglePlayPause(page) {
    await page.waitForTimeout(4000);
    await page.keyboard.press('k');
    await page.waitForTimeout(4000);
  },

  async skipForward(page, seconds = 10) {
    for (let i = 0; i < seconds / 5; i++) {
      await page.keyboard.press('ArrowRight');
      await page.waitForTimeout(500);
    }
  }



};
