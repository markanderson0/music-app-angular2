// describe('Merch List', () => {

//   beforeEach(() => {
//     browser.get('/merch/category/apparel');
//   });

//   it('should have <merch-list>', () => {
//     var merchList = element(by.css('my-app merch-list'));
//     expect(merchList.isPresent()).toEqual(true);
//   });

//   it('should have <panel>', () => {
//     var panel = element(by.css('my-app panel'));
//     expect(panel.isPresent()).toEqual(true);
//   });

//   it('should have a category heading', () => {
//     var heading = element(by.css('#merch-search-label'));
//     expect(heading.isPresent()).toEqual(true);
//     expect(heading.getText()).toEqual("apparel");
//   });

//   it('should sort select', () => {
//     var merchSort = element(by.css('.merch-sort'));
//     expect(merchSort.isPresent()).toEqual(true);
//   });

//   it('should have merch items ', () => {
//     var merchItems = element(by.css('#merch-items'));
//     expect(merchItems.isPresent()).toEqual(true);
//   });

//   it('should have load more button', () => {
//     var loadBtn = element(by.css('#load-button'));
//     expect(loadBtn.isPresent()).toEqual(true);
//   });
// });
