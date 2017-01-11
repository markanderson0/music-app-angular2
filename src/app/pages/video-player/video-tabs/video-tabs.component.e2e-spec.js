// describe('Video Tabs', () => {

//   beforeEach(() => {
//     browser.get('/video/Radiohead/show123/p123/vid123');
//   });

//   it('should have <video-tabs>', () => {
//     var videoTabs = element(by.css('my-app video-tabs'));
//     expect(videoTabs.isPresent()).toEqual(true);
//   });

//   it('should have <panel>', () => {
//     var panel = element(by.css('my-app panel'));
//     expect(panel.isPresent()).toEqual(true);
//   });

//   // Videos Tab
//   it('should have video title', () => {
//     element.all(by.css('.nav-item')).get(2).click().then(() => {    
//       var videoTitle = element(by.css('.video-title'));
//       expect(videoTitle.isPresent()).toEqual(true);
//     });  
//   });

//   it('should have video picture', () => {
//     element.all(by.css('.nav-item')).get(2).click().then(() => { 
//       var videoPic = element(by.css('.video-pic'));
//       expect(videoPic.isPresent()).toEqual(true);
//     });  
//   });

//   it('should have video ratings', () => {
//     element.all(by.css('.nav-item')).get(2).click().then(() => {     
//       var videoRatings = element(by.css('.video-rating'));
//       expect(videoRatings.isPresent()).toEqual(true);
//     });  
//   });

//   it('should have video time', () => {
//     element.all(by.css('.nav-item')).get(2).click().then(() => {   
//       var videoTime = element(by.css('.video-time'));
//       expect(videoTime.isPresent()).toEqual(true);
//     });  
//   });

//   it('should have video views', () => {
//     element.all(by.css('.nav-item')).get(2).click().then(() => {    
//       var videoViews = element(by.css('.video-views'));
//       expect(videoViews.isPresent()).toEqual(true);
//     });  
//   });

//   it('should have video songs', () => {
//     element.all(by.css('.nav-item')).get(2).click().then(() => {  
//       var videoSongs = element(by.css('.video-songs'));
//       expect(videoSongs.isPresent()).toEqual(true);
//     });  
//   });

//   // Tickets Tab
//   it('should have tickets', () => {
//     element.all(by.css('.nav-item')).get(3).click().then(() => {   
//       var ticketsTable = element(by.css('#tickets'));
//       expect(ticketsTable.isPresent()).toEqual(true);
//     });  
//   });

//   it('should have tickets table headers', () => {
//     element.all(by.css('.nav-item')).get(3).click().then(() => {    
//       var ticketsVenue = element(by.css('#tickets #venue-header'));
//       var ticketsDate = element(by.css('#tickets #date-header'));
//       var ticketsTickets = element(by.css('#tickets #tickets-header'));
//       expect(ticketsVenue.isPresent()).toEqual(true);
//       expect(ticketsDate.isPresent()).toEqual(true);
//       expect(ticketsTickets.isPresent()).toEqual(true);
//     });  
//   });

//   // Merch Tab
//   it('should have merch', () => {
//     element.all(by.css('.nav-item')).get(4).click().then(() => {   
//       var merch = element(by.css('.artist-merch-div'));
//       expect(merch.isPresent()).toEqual(true);
//     });  
//   });

//   it('should have merch items', () => {
//     element.all(by.css('.nav-item')).get(4).click().then(() => {    
//       var merchPic = element(by.css('.artist-merch-div img'));
//       var merchName = element(by.css('.artist-merch-div h4'));
//       var merchPrice = element(by.css('.artist-merch-div h6'));
//       expect(merchPic.isPresent()).toEqual(true);
//       expect(merchName.isPresent()).toEqual(true);
//       expect(merchPrice.isPresent()).toEqual(true);
//     });  
//   });

//   // Albums Tab
//   it('should have albums', () => {
//     element.all(by.css('.nav-item')).get(5).click().then(() => {   
//       var albums = element(by.css('.artist-album-div'));
//       expect(albums.isPresent()).toEqual(true);
//     });  
//   });

//   it('should have albums covers and names', () => {
//     element.all(by.css('.nav-item')).get(5).click().then(() => {    
//     var albumCover = element(by.css('#album-cover'));
//     expect(albumCover.isPresent()).toEqual(true);
//     var albumName = element(by.css('#album-name'));
//     expect(albumName.isPresent()).toEqual(true);
//     });  
//   });

//   // Previous Shows Tab
//   it('should have previous shows', () => {
//     element.all(by.css('.nav-item')).get(6).click().then(() => {  
//       var shows = element(by.css('#previous-shows'));
//       expect(shows.isPresent()).toEqual(true);
//     });  
//   });

//   it('should have previous shows table', () => {
//     element.all(by.css('.nav-item')).get(6).click().then(() => {    
//       var venueHeader = element(by.css('#artist-venue-header'));
//       expect(venueHeader.isPresent()).toEqual(true);
//       expect(venueHeader.getText()).toEqual("Venue");
//       var locationHeader = element.all(by.css('#venue-header')).get(0);
//       expect(locationHeader.isPresent()).toEqual(true);
//       expect(locationHeader.getText()).toEqual("Location");
//       var tourHeader = element.all(by.css('#venue-header')).get(1);
//       expect(tourHeader.isPresent()).toEqual(true);
//       expect(tourHeader.getText()).toEqual("Tour");
//       var dateHeader = element.all(by.css('#date-header')).get(0);
//       expect(dateHeader.isPresent()).toEqual(true);
//       expect(dateHeader.getText()).toEqual("Date");
//       var setlistHeader = element.all(by.css('#date-header')).get(1);
//       expect(setlistHeader.isPresent()).toEqual(true);
//       expect(setlistHeader.getText()).toEqual("Setlist");
//     });  
//   });
// });
