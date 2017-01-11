// describe('Upload Video', () => {

//   beforeEach(() => {
//     browser.get('/profile/upload');
//   });

//   it('should have <upload-video>', () => {
//     var uploadVideo = element(by.css('my-app upload-video'));
//     expect(uploadVideo.isPresent()).toEqual(true);
//   });

//   it('should have <panel>', () => {
//     var panel = element(by.css('my-app panel'));
//     expect(panel.isPresent()).toEqual(true);
//   });

//   it('should have artist name input', () => {
//     element.all(by.css('.nav-item')).get(0).click().then(() => {
//       var artistNameLabel = element(by.css('#artist label'));
//       var artistNameInput = element(by.css('#artist input'));
//       expect(artistNameLabel.isPresent()).toEqual(true);
//       expect(artistNameLabel.getText()).toEqual("Select an Artist");
//       expect(artistNameInput.isPresent()).toEqual(true);
//     });  
//   });

//   it('should show year input', () => {
//     element.all(by.css('.nav-item')).get(0).click().then(() => {
//       var yearLabel = element(by.css('#showYear label'));
//       var yearInput = element(by.css('#showYear input'));
//       expect(yearLabel.isPresent()).toEqual(true);
//       expect(yearLabel.getText()).toEqual("Select Year of Show");
//       expect(yearInput.isPresent()).toEqual(true);
//     });  
//   });

//   it('should show input', () => {
//     element.all(by.css('.nav-item')).get(0).click().then(() => {
//       var showLabel = element(by.css('#show label'));
//       var showInput = element(by.css('#show select'));
//       expect(showLabel.isPresent()).toEqual(true);
//       expect(showLabel.getText()).toEqual("Select a Show");
//       expect(showInput.isPresent()).toEqual(true);
//     });  
//   });

//   it('should have songs input', () => {
//     element.all(by.css('.nav-item')).get(0).click().then(() => {
//       var songsLabel = element(by.css('#songs label'));
//       var songsInput = element(by.css('#songs dropdown-multiselect'));
//       expect(songsLabel.isPresent()).toEqual(true);
//       expect(songsLabel.getText()).toEqual("Select Songs");
//       expect(songsInput.isPresent()).toEqual(true);
//     });  
//   });

//   it('should have selected-songs display', () => {
//     element.all(by.css('.nav-item')).get(0).click().then(() => {
//       var selectedSongsLabel = element(by.css('#selected-songs label'));
//       var selectedSongsInput = element(by.css('#selected-songs textarea'));
//       expect(selectedSongsLabel.isPresent()).toEqual(true);
//       expect(selectedSongsLabel.getText()).toEqual("Selected Songs");
//       expect(selectedSongsInput.isPresent()).toEqual(true);
//     });  
//   });
// });
