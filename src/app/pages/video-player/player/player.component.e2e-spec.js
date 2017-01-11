// describe('Player', () => {

//   beforeEach(() => {
//     browser.get('/video/Radiohead/show123/p123/vid123');
//   });

//   it('should have <player>', () => {
//     var player = element(by.css('my-app player'));
//     expect(player.isPresent()).toEqual(true);
//   });

//   it('should have <panel>', () => {
//     var panel = element(by.css('my-app panel'));
//     expect(panel.isPresent()).toEqual(true);
//   });

//   it('should have banner pic', () => {
//     var bannerPic = element(by.css('#artist-banner-pic'));
//     expect(bannerPic.isPresent()).toEqual(true);
//   });

//   it('should have heading', () => {
//     var heading = element(by.css('#crowd-label'));
//     expect(heading.isPresent()).toEqual(true);
//     expect(heading.getText()).toEqual("Radiohead");
//   });

//   it('should have video stats', () => {
//     var videoStats = element(by.css('#video-stats'));
//     expect(videoStats.isPresent()).toEqual(true);  
//   });

//   it('should have video songs', () => {  
//     var videoSongs = element(by.css('#video-songs-list'));
//     expect(videoSongs.isPresent()).toEqual(true); 
//   });

//   it('should have toggleable following button', () => { 
//     var followBtn = element.all(by.css('#video-details-btn')).get(0);
//     expect(followBtn.isPresent()).toEqual(true);
//     expect(followBtn.getText()).toEqual("Follow"); 
//     followBtn.click();
//     expect(followBtn.getText()).toEqual("Following"); 
//   });

//   it('should have toggleable favourites button', () => { 
//     var favouriteBtn = element.all(by.css('#video-details-btn')).get(1);
//     expect(favouriteBtn.isPresent()).toEqual(true);
//     expect(favouriteBtn.getText()).toEqual("Favourite"); 
//     favouriteBtn.click();
//     expect(favouriteBtn.getText()).toEqual("Favourited"); 
//   });

//   it('should have video rading buttons', () => {    
//     var audioRating = element.all(by.css('#video-ratings-btn')).get(0);
//     var videoRating = element.all(by.css('#video-ratings-btn')).get(1);
//     expect(audioRating.isPresent()).toEqual(true);
//     expect(videoRating.isPresent()).toEqual(true);
//     expect(audioRating.getText()).toContain("Rate Audio");
//     expect(videoRating.getText()).toContain("Rate Video");
//   });
// });
