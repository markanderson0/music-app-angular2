// describe('Profile Videos', () => {

//   beforeEach(() => {
//     browser.get('/profile/profile');
//   });

//   it('should have <videos>', () => {
//     var videos = element(by.css('my-app videos'));
//     expect(videos.isPresent()).toEqual(true);
//   });

//   it('should have <panel>', () => {
//     var panel = element(by.css('my-app panel'));
//     expect(panel.isPresent()).toEqual(true);
//   });

//   it('should have artist name', () => {
//     element(by.css('#accordion-header')).click();
//     var videoTitle = element(by.css('.video-title'));
//     expect(videoTitle.isPresent()).toEqual(true);
//   });

//   it('should have video location', () => {
//     element(by.css('#accordion-header')).click();
//     var videoLocation = element(by.css('.video-tile'));
//     expect(videoLocation.isPresent()).toEqual(true);
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
