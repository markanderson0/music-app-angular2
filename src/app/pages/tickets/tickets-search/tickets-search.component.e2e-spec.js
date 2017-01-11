// describe('Tickets Search', () => {

//   beforeEach(() => {
//     browser.get('/tickets/search;query=artist1');
//   });

//   it('should have <tickets-search>', () => {
//     var ticketsSearch = element(by.css('my-app tickets-search'));
//     expect(ticketsSearch.isPresent()).toEqual(true);
//   });

//   it('should have <panel>', () => {
//     var panel = element(by.css('my-app panel'));
//     expect(panel.isPresent()).toEqual(true);
//   });

//   it('should have a heading', () => {
//     var heading = element(by.css('.search-label'));
//     expect(heading.isPresent()).toEqual(true);
//     expect(heading.getText()).toEqual("artist1 Tickets");
//   });

//   it('should have list view button', () => {
//     var openList = element(by.css('#open-list'));
//     expect(openList.isPresent()).toEqual(true);
//   });

//   it('should have map view button', () => {
//     var openMap = element(by.css('#open-map'));
//     expect(openMap.isPresent()).toEqual(true);
//   });

//   it('should have artist table', () => {
//     var artistTable = element(by.css('#search-table'));
//     expect(artistTable.isPresent()).toEqual(true);
//   });
// });
