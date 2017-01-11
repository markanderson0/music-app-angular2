// describe('Profile Following', () => {

//   beforeEach(() => {
//     browser.get('/profile/profile');
//   });

//   it('should have <following>', () => {
//     var following = element(by.css('my-app following'));
//     expect(following.isPresent()).toEqual(true);
//   });

//   it('should have <panel>', () => {
//     var panel = element(by.css('my-app panel'));
//     expect(panel.isPresent()).toEqual(true);
//   });

//   it('should have artist picture', () => {
//     element.all(by.css('.nav-item')).get(1).click().then(() => {
//       var artistPic = element(by.css('#following-image'));
//       expect(artistPic.isPresent()).toEqual(true);
//     });  
//   });

//   it('should have artist name', () => {
//     element.all(by.css('.nav-item')).get(1).click().then(() => {
//       var artistName = element(by.css('#following-name'));
//       expect(artistName.isPresent()).toEqual(true);
//     });  
//   });

//   it('should have open profile link', () => {
//     element.all(by.css('.nav-item')).get(1).click().then(() => {
//       var profileLink = element(by.css('#follow-link-profile'));
//       expect(profileLink.isPresent()).toEqual(true);
//     });  
//   });

//   it('should have open videos link', () => {
//     element.all(by.css('.nav-item')).get(1).click().then(() => {
//     var videosLink = element(by.css('#follow-link-videos'));
//     expect(videosLink.isPresent()).toEqual(true);
//     });  
//   });
// });
