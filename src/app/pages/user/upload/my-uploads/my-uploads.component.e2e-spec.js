// describe('My Uploads', () => {

//   beforeEach(() => {
//     browser.get('/profile/upload');
//   });

//   it('should have <my-uploads>', () => {
//     var myUploads = element(by.css('my-app my-uploads'));
//     expect(myUploads.isPresent()).toEqual(true);
//   });

//   it('should have <panel>', () => {
//     var panel = element(by.css('my-app panel'));
//     expect(panel.isPresent()).toEqual(true);
//   });

//   it('should have artist name', () => {
//     element.all(by.css('.nav-item')).get(1).click().then(() => {
//       element(by.css('#accordion-header')).click();
//       var videoTitle = element(by.css('.video-title'));
//       expect(videoTitle.isPresent()).toEqual(true);
//     });  
//   });

//   it('should have video location', () => {
//     element.all(by.css('.nav-item')).get(1).click().then(() => {
//       element(by.css('#accordion-header')).click();
//       var videoLocation = element(by.css('.video-tile'));
//       expect(videoLocation.isPresent()).toEqual(true);
//     });  
//   });

//   it('should have video picture', () => {
//     element.all(by.css('.nav-item')).get(1).click().then(() => {
//       element(by.css('#accordion-header')).click();
//       var videoPic = element(by.css('.video-pic'));
//       expect(videoPic.isPresent()).toEqual(true);
//     });  
//   });

//   it('should have video ratings', () => {
//     element.all(by.css('.nav-item')).get(1).click().then(() => {
//       element(by.css('#accordion-header')).click();
//       var videoRatings = element(by.css('.video-rating'));
//       expect(videoRatings.isPresent()).toEqual(true);
//     });  
//   });

//   it('should have video time', () => {
//     element.all(by.css('.nav-item')).get(1).click().then(() => {
//       element(by.css('#accordion-header')).click();
//       var videoTime = element(by.css('.video-time'));
//       expect(videoTime.isPresent()).toEqual(true);
//     });  
//   });

//   it('should have video views', () => {
//     element.all(by.css('.nav-item')).get(1).click().then(() => {
//       element(by.css('#accordion-header')).click();
//       var videoViews = element(by.css('.video-views'));
//       expect(videoViews.isPresent()).toEqual(true);
//     });  
//   });

//   it('should have video songs', () => {
//     element.all(by.css('.nav-item')).get(1).click().then(() => {
//       element(by.css('#accordion-header')).click();
//       var videoSongs = element(by.css('.video-songs'));
//       expect(videoSongs.isPresent()).toEqual(true);
//     });  
//   });
// });
