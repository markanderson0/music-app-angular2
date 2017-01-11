// describe('Browse Genre', () => {

//   beforeEach(() => {
//     browser.get('/browse/genre/rock');
//   });

//   it('should have <browse-genre>', () => {
//     var browseGenre = element(by.css('my-app browse-genre'));
//     expect(browseGenre.isPresent()).toEqual(true);
//   });

//   it('should have <panel>', () => {
//     var panel = element(by.css('my-app panel'));
//     expect(panel.isPresent()).toEqual(true);
//   });

//   it('should have a heading', () => {
//     var heading = element(by.css('.heading-label'));
//     expect(heading.isPresent()).toEqual(true);
//     expect(heading.getText()).toEqual("Browse");
//   });

//   it('should have genre picture', () => {
//     var genrePic = element(by.css('.browse-event-tile'));
//     expect(genrePic.isPresent()).toEqual(true);
//   });

//   it('should have genre name', () => {
//     var genreName = element(by.css('.browse-name'));
//     expect(genreName.isPresent()).toEqual(true);
//   });

//   it('should have load more button', () => {
//     var loadBtn = element(by.css('#load-button'));
//     expect(loadBtn.isPresent()).toEqual(true);
//   });
// });
