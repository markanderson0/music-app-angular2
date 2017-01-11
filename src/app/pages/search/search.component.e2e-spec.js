// describe('Search', () => {

//   beforeEach(() => {
//     browser.get('/search;query=artist1');
//   });

//   it('should have <search>', () => {
//     var search = element(by.css('my-app search'));
//     expect(search.isPresent()).toEqual(true);
//   });

//   it('should have <panel>', () => {
//     var panel = element(by.css('my-app panel'));
//     expect(panel.isPresent()).toEqual(true);
//   });

//   it('should have heading', () => {
//     var heading = element(by.css('#search-heading'));
//     expect(heading.isPresent()).toEqual(true);
//     expect(heading.getText()).toEqual("Search / artist1");
//   });

//   it('should have artist picture', () => {
//     var pic = element(by.css('.browse-event-tile'));
//     expect(pic.isPresent()).toEqual(true);
//   });

//   it('should have artist name', () => {
//     var name = element(by.css('.browse-name'));
//     expect(name.isPresent()).toEqual(true);
//   });
// });
