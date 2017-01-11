// describe('Tickets', () => {

//   beforeEach(() => {
//     browser.get('/tickets');
//   });

//   it('should have <tickets>', () => {
//     var tickets = element(by.css('my-app tickets'));
//     expect(tickets.isPresent()).toEqual(true);
//   });

//   it('should have <panel>', () => {
//     var panel = element(by.css('my-app panel'));
//     expect(panel.isPresent()).toEqual(true);
//   });

//   it('should have a heading', () => {
//     var heading = element(by.css('#tickets-label'));
//     expect(heading.isPresent()).toEqual(true);
//     expect(heading.getText()).toEqual("TICKETS");
//   });

//   it('should have search bar', () => {
//     var searchBar = element(by.css('form input'));
//     var searchBtn = element(by.css('#search-btn'));
//     expect(searchBar.isPresent()).toEqual(true);
//     expect(searchBtn.isPresent()).toEqual(true);
//   });

//   it('should have navigation button', () => {
//     var navBtn = element(by.css('#tickets-genre-btn'));
//     expect(navBtn.isPresent()).toEqual(true);
//   });
// });
