module.exports = {
  async getVideoTime(page) {
    return await page.evaluate(() => {
      const video = document.querySelector('video');
      return video ? video.currentTime : 0;
    });
  },


};
