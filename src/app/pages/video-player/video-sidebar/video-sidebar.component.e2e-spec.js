// describe('Video Sidebar', () => {

//   beforeEach(() => {
//     browser.get('/video/Radiohead/show123/p123/vid123');
//   });

//   it('should have <video-sidebar>', () => {
//     var videoSidebar = element(by.css('my-app video-sidebar'));
//     expect(videoSidebar.isPresent()).toEqual(true);
//   });

//   it('should have <panel>', () => {
//     var panel = element(by.css('my-app panel'));
//     expect(panel.isPresent()).toEqual(true);
//   });

//   // Playlist Tab
//   it('should have video picture', () => {
//     element.all(by.css('.nav-item')).get(0).click().then(() => { 
//       var videoPic = element(by.css('#playlist-image'));
//       expect(videoPic.isPresent()).toEqual(true);
//     });  
//   });

//   it('should have video ratings', () => {
//     element.all(by.css('.nav-item')).get(0).click().then(() => {     
//       var videoRatings = element(by.css('#playlist-song-rating'));
//       expect(videoRatings.isPresent()).toEqual(true);
//     });  
//   });

//   it('should have video time', () => {
//     element.all(by.css('.nav-item')).get(0).click().then(() => {   
//       var videoTime = element(by.css('#playlist-video-time'));
//       expect(videoTime.isPresent()).toEqual(true);
//     });  
//   });

//   it('should have video views', () => {
//     element.all(by.css('.nav-item')).get(0).click().then(() => {    
//       var videoViews = element(by.css('#playlist-video-views'));
//       expect(videoViews.isPresent()).toEqual(true);
//     });  
//   });

//   it('should have video songs', () => {
//     element.all(by.css('.nav-item')).get(0).click().then(() => {  
//       var videoSongs = element(by.css('#playlist-songs-list'));
//       expect(videoSongs.isPresent()).toEqual(true);
//     });  
//   });

//   // Setlist Tab
//   it('should have setlist', () => {
//     element.all(by.css('.nav-item')).get(1).click().then(() => {   
//       var setlist = element(by.css('#playlist-tab-setlist'));
//       expect(setlist.isPresent()).toEqual(true);
//     });  
//   });
// });
