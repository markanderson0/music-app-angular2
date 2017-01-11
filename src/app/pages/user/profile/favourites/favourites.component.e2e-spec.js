// describe('Profile Favourites', () => {

//   beforeEach(() => {
//     browser.get('/profile/profile');
//   });

//   it('should have <favourites>', () => {
//     var favourites = element(by.css('my-app favourites'));
//     expect(favourites.isPresent()).toEqual(true);
//   });

//   it('should have <panel>', () => {
//     var panel = element(by.css('my-app panel'));
//     expect(panel.isPresent()).toEqual(true);
//   });

//   it('should have artist name', () => {
//     element.all(by.css('.nav-item')).get(2).click().then(() => {
//       element.all(by.css('#accordion-header')).get(0).click();
//       var videoTitle = element(by.css('.video-title'));
//       expect(videoTitle.isPresent()).toEqual(true);
//     });  
//   });

//   it('should have video title', () => {
//     element.all(by.css('.nav-item')).get(2).click().then(() => {
//       element(by.css('#accordion-header')).click();
//       var videoTitle = element(by.css('.video-tile'));
//       expect(videoTitle.isPresent()).toEqual(true);
//       expect(videoTitle.getText()).toContain("Uploaded By");
//     });  
//   });

//   it('should have video picture', () => {
//     element.all(by.css('.nav-item')).get(2).click().then(() => {
//       element(by.css('#accordion-header')).click();
//       var videoPic = element(by.css('#favourite-videos-pic'));
//       expect(videoPic.isPresent()).toEqual(true);
//     });  
//   });

//   it('should have video ratings', () => {
//     element.all(by.css('.nav-item')).get(2).click().then(() => {
//       element(by.css('#accordion-header')).click();
//       var videoRatings = element(by.css('#favourite-videos-rating'));
//       expect(videoRatings.isPresent()).toEqual(true);
//     });  
//   });

//   it('should have video time', () => {
//     element.all(by.css('.nav-item')).get(2).click().then(() => {
//       element(by.css('#accordion-header')).click();
//       var videoTime = element(by.css('#favourite-videos-time'));
//       expect(videoTime.isPresent()).toEqual(true);
//     });  
//   });

//   it('should have video views', () => {
//     element.all(by.css('.nav-item')).get(2).click().then(() => {
//       element(by.css('#accordion-header')).click();
//       var videoViews = element(by.css('#favourite-videos-views'));
//       expect(videoViews.isPresent()).toEqual(true);
//     });
//   });

//   it('should have video songs', () => {
//     element.all(by.css('.nav-item')).get(2).click().then(() => {
//       element(by.css('#accordion-header')).click();
//       var videoSongs = element(by.css('#favourite-videos-songs'));
//       expect(videoSongs.isPresent()).toEqual(true);
//     });
//   });
// });
