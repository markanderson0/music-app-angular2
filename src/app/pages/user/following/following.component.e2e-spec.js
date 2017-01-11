// describe('Following', () => {

//   beforeEach(() => {
//     browser.get('/profile/following');
//   });

//   it('should have <following>', () => {
//     var following = element(by.css('my-app following'));
//     expect(following.isPresent()).toEqual(true);
//   });

//   it('should have <panel>', () => {
//     var panel = element(by.css('my-app panel'));
//     expect(panel.isPresent()).toEqual(true);
//   });

//   it('should have a heading', () => {
//     var heading = element(by.css('.heading-label'));
//     expect(heading.isPresent()).toEqual(true);
//     expect(heading.getText()).toEqual("Following");
//   });

//   it('should have artist picture', () => {
//     var artistPic = element(by.css('#following-image'));
//     expect(artistPic.isPresent()).toEqual(true);
//   });

//   it('should have artist name', () => {
//     var artistName = element(by.css('#following-name'));
//     expect(artistName.isPresent()).toEqual(true);
//   });

//   it('should have open profile link', () => {
//     var profileLink = element(by.css('#follow-link-profile'));
//     expect(profileLink.isPresent()).toEqual(true);
//   });

//   it('should have open videos link', () => {
//     var videosLink = element(by.css('#follow-link-videos'));
//     expect(videosLink.isPresent()).toEqual(true);
//   });
// });
