// describe('Artist Profile', () => {

//   beforeEach(() => {
//     browser.get('/artist/artist1/profile');
//   });

//   it('should have <artist-profile>', () => {
//     var artistProfile = element(by.css('my-app artist-profile'));
//     expect(artistProfile.isPresent()).toEqual(true);
//   });

//   it('should have <panel>', () => {
//     var panel = element(by.css('my-app panel'));
//     expect(panel.isPresent()).toEqual(true);
//   });

//   it('should have <img>', () => {
//     var img = element(by.css('my-app panel img'));
//     expect(img.isPresent()).toEqual(true);
//   });

//   it('should have banner pic', () => {
//     var bannerPic = element(by.css('#artist-banner-pic'));
//     expect(bannerPic.isPresent()).toEqual(true);
//   });

//   it('should have heading', () => {
//     var heading = element(by.css('#crowd-label'));
//     expect(heading.isPresent()).toEqual(true);
//     expect(heading.getText()).toEqual("artist1");
//   });

//   // Top Videos
//   it('should have videos', () => {
//     var videos = element(by.css('#top-video'));
//     expect(videos.isPresent()).toEqual(true);
//   });

//   it('should have video heading', () => {
//     var videoHeading = element(by.css('#top-video-tile label'));
//     expect(videoHeading.isPresent()).toEqual(true);
//     expect(videoHeading.getText()).toEqual("Uploaded By testUser1");
//   });

//   it('should have video picture', () => {
//     var videoPic = element(by.css('.video-pic'));
//     expect(videoPic.isPresent()).toEqual(true);
//   });

//   it('should have video rating', () => {
//     var videoRating = element(by.css('#top-video-rating'));
//     expect(videoRating.isPresent()).toEqual(true);
//     expect(videoRating.getText()).toContain("5" && "7");
//   });

//   it('should have video time', () => {
//     var videoTime = element(by.css('#top-video-time'));
//     expect(videoTime.isPresent()).toEqual(true);
//     expect(videoTime.getText()).toContain("20:00");
//   });

//   it('should have video views', () => {
//     var videoViews = element(by.css('#top-video-views span'));
//     expect(videoViews.isPresent()).toEqual(true);
//     expect(videoViews.getText()).toContain("100");
//   });

//   it('should have video songs', () => {
//     var videoSongs = element(by.css('#top-video-songs'));
//     expect(videoSongs.isPresent()).toEqual(true);
//     expect(videoSongs.getText()).toContain("Everything In Its Right Place");
//   });

//   it('should sub label headings', () => {
//     var videoHeading = element.all(by.css('.artist-sub-label')).get(0);
//     var ticketsHeading = element.all(by.css('.artist-sub-label')).get(1);
//     var merchHeading = element.all(by.css('.artist-sub-label')).get(2);
//     var showsHeading = element.all(by.css('.artist-sub-label')).get(3);
//     var albumsHeading = element.all(by.css('.artist-sub-label')).get(4);
//     expect(videoHeading.isPresent()).toEqual(true);
//     expect(ticketsHeading.isPresent()).toEqual(true);
//     expect(merchHeading.isPresent()).toEqual(true);
//     expect(showsHeading.isPresent()).toEqual(true);
//     expect(albumsHeading.isPresent()).toEqual(true);
//     expect(videoHeading.getText()).toContain("Top Videos");
//     expect(ticketsHeading.getText()).toContain("Tickets");
//     expect(merchHeading.getText()).toContain("Merch");
//     expect(showsHeading.getText()).toContain("Previous Shows");
//     expect(albumsHeading.getText()).toContain("Albums");
//   });
// });
