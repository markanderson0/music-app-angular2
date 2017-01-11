// describe('Edit Privacy', () => {

//   beforeEach(() => {
//     browser.get('/profile/settings');
//   });

//   it('should have <edit-privacy>', () => {
//     var editPrivacy = element(by.css('my-app edit-privacy'));
//     expect(editPrivacy.isPresent()).toEqual(true);
//   });

//   it('should have <panel>', () => {
//     var panel = element(by.css('my-app panel'));
//     expect(panel.isPresent()).toEqual(true);
//   });

//   it('should have privacy option 1', () => {
//     element.all(by.css('.nav-item')).get(2).click().then(() => {
//       var privacy1Label = element(by.css('#privacy1'));
//       var privacy1Input = element.all(by.css('input')).get(0);
//       expect(privacy1Label.isPresent()).toEqual(true);
//       expect(privacy1Label.getText()).toEqual("Allow other users to see who you follow");
//       expect(privacy1Input.isPresent()).toEqual(true);
//     });  
//   });

//   it('should have privacy option 2', () => {
//     element.all(by.css('.nav-item')).get(2).click().then(() => {
//       var privacy1Label = element(by.css('#privacy2'));
//       var privacy1Input = element.all(by.css('input')).get(1);
//       expect(privacy1Label.isPresent()).toEqual(true);
//       expect(privacy1Label.getText()).toEqual("Allow other users to see your favourited videos");
//       expect(privacy1Input.isPresent()).toEqual(true);
//     });  
//   });

//   it('should have privacy option 3', () => {
//     element.all(by.css('.nav-item')).get(2).click().then(() => {
//       var privacy1Label = element(by.css('#privacy3'));
//       var privacy1Input = element.all(by.css('input')).get(2);
//       expect(privacy1Label.isPresent()).toEqual(true);
//       expect(privacy1Label.getText()).toEqual("Allow other users to see your score");
//       expect(privacy1Input.isPresent()).toEqual(true);
//     });  
//   });

//   it('should have privacy option 4', () => {
//     element.all(by.css('.nav-item')).get(2).click().then(() => {
//       var privacy1Label = element(by.css('#privacy4'));
//       var privacy1Input = element.all(by.css('input')).get(3);
//       expect(privacy1Label.isPresent()).toEqual(true);
//       expect(privacy1Label.getText()).toEqual("Allow other users to see your video ratings");
//       expect(privacy1Input.isPresent()).toEqual(true);
//     });  
//   });
// });
