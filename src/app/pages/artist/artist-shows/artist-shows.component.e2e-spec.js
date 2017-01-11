// describe('Artist Shows', () => {

//   beforeEach(() => {
//     browser.get('/artist/Radiohead/shows');
//   });

//   it('should have <artist-shows>', () => {
//     var artistShows = element(by.css('my-app artist-shows'));
//     expect(artistShows.isPresent()).toEqual(true);
//   });

//   it('should have <panel>', () => {
//     var panel = element(by.css('my-app panel'));
//     expect(panel.isPresent()).toEqual(true);
//   });

//   it('should have <img>', () => {
//     var img = element(by.css('my-app panel img'));
//     expect(img.isPresent()).toEqual(true);
//   });

//   it('should have title', () => {
//     var title = element(by.css('#shows-title-label'));
//     expect(title.isPresent()).toEqual(true);
//     expect(title.getText()).toEqual("Previous Shows");
//   });

//   it('should have venue header', () => {
//     var venueHeader = element(by.css('#artist-venue-header'));
//     expect(venueHeader.isPresent()).toEqual(true);
//     expect(venueHeader.getText()).toEqual("Venue");
//   });

//   it('should have location header', () => {
//     var locationHeader = element.all(by.css('#venue-header')).get(0);
//     expect(locationHeader.isPresent()).toEqual(true);
//     expect(locationHeader.getText()).toEqual("Location");
//   });

//   it('should have tour header', () => {
//     var tourHeader = element.all(by.css('#venue-header')).get(1);
//     expect(tourHeader.isPresent()).toEqual(true);
//     expect(tourHeader.getText()).toEqual("Tour");
//   });

//   it('should have date header', () => {
//     var dateHeader = element.all(by.css('#date-header')).get(0);
//     expect(dateHeader.isPresent()).toEqual(true);
//     expect(dateHeader.getText()).toEqual("Date");
//   });

//   it('should have setlist header', () => {
//     var setlistHeader = element.all(by.css('#date-header')).get(1);
//     expect(setlistHeader.isPresent()).toEqual(true);
//     expect(setlistHeader.getText()).toEqual("Setlist");
//   });
// });
