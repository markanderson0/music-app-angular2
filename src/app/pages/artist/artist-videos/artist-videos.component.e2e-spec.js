// describe('Artist Videos', () => {

//   beforeEach(() => {
//     browser.get('/artist/Radiohead/videos');
//   });

//   it('should have <artist-videos>', () => {
//     var artistVideos = element(by.css('my-app artist-videos'));
//     expect(artistVideos.isPresent()).toEqual(true);
//   });

//   it('should have <panel>', () => {
//     var panel = element(by.css('my-app panel'));
//     expect(panel.isPresent()).toEqual(true);
//   });

//   it('should have <img>', () => {
//     var img = element(by.css('my-app panel img'));
//     expect(img.isPresent()).toEqual(true);
//   });

//   it('should have video date and location on accordion header', () => {
//     var accHeader = element(by.css('#accordion-header'));
//     expect(accHeader.isPresent()).toEqual(true);
//   });

//   it('should have video title', () => {
//     element(by.css('#accordion-header')).click();
//     var videoTitle = element(by.css('.video-title'));
//     expect(videoTitle.isPresent()).toEqual(true);
//     expect(videoTitle.getText()).toContain("Uploaded By");
  
//   });

//   it('should have video picture', () => {
//     element(by.css('#accordion-header')).click();
//     var videoPic = element(by.css('.video-pic'));
//     expect(videoPic.isPresent()).toEqual(true);
//   });

//   it('should have video ratings', () => {
//     element(by.css('#accordion-header')).click();
//     var videoRatings = element(by.css('.video-rating'));
//     expect(videoRatings.isPresent()).toEqual(true);
//   });

//   it('should have video time', () => {
//     element(by.css('#accordion-header')).click();
//     var videoTime = element(by.css('.video-time'));
//     expect(videoTime.isPresent()).toEqual(true);
//   });

//   it('should have video views', () => {
//     element(by.css('#accordion-header')).click();
//     var videoViews = element(by.css('.video-views'));
//     expect(videoViews.isPresent()).toEqual(true);
//   });

//   it('should have video songs', () => {
//     element(by.css('#accordion-header')).click();
//     var videoSongs = element(by.css('.video-songs'));
//     expect(videoSongs.isPresent()).toEqual(true);
//   });
// });
