// describe('Tickets Genre', () => {

//   beforeEach(() => {
//     browser.get('/tickets/genre/world');
//   });

//   it('should have <tickets-genre>', () => {
//     var ticketsGenre = element(by.css('my-app tickets-genre'));
//     expect(ticketsGenre.isPresent()).toEqual(true);
//   });

//   it('should have <panel>', () => {
//     var panel = element(by.css('my-app panel'));
//     expect(panel.isPresent()).toEqual(true);
//   });

//   it('should have a heading', () => {
//     var heading = element(by.css('.top-events-label'));
//     expect(heading.isPresent()).toEqual(true);
//     expect(heading.getText()).toEqual("Top World Events");
//   });

//   it('should have artist picture', () => {
//     var artistPic = element(by.css('.event-tile'));
//     expect(artistPic.isPresent()).toEqual(true);
//   });

//   it('should have artist name', () => {
//     var artistName = element(by.css('.event-name'));
//     expect(artistName.isPresent()).toEqual(true);
//   });

//   it('should have artist table', () => {
//     var artistTable = element(by.css('#cat-table'));
//     expect(artistTable.isPresent()).toEqual(true);
//   });

//   it('should have load more button', () => {
//     var loadBtn = element(by.css('#load-button'));
//     expect(loadBtn.isPresent()).toEqual(true);
//   });
// });
