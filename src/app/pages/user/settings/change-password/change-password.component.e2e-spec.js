// describe('Change Password', () => {

//   beforeEach(() => {
//     browser.get('/profile/settings');
//   });

//   it('should have <change-password>', () => {
//     var changePassword = element(by.css('my-app change-password'));
//     expect(changePassword.isPresent()).toEqual(true);
//   });

//   it('should have <panel>', () => {
//     var panel = element(by.css('my-app panel'));
//     expect(panel.isPresent()).toEqual(true);
//   });

//   it('should have old password', () => {
//     element.all(by.css('.nav-item')).get(1).click().then(() => {
//       var oldPasswordLabel = element(by.css('#old-password label'));
//       var oldPasswordInput = element(by.css('#old-password input'));
//       expect(oldPasswordLabel.isPresent()).toEqual(true);
//       expect(oldPasswordLabel.getText()).toEqual("Old Password");
//       expect(oldPasswordInput.isPresent()).toEqual(true);
//     });  
//   });

//   it('should show old password errors', () => {
//     element.all(by.css('.nav-item')).get(1).click().then(() => {
//       var oldPasswordLabel = element(by.css('#old-password label'));
//       var oldPasswordInput = element(by.css('#old-password input'));
//       expect(oldPasswordLabel.isPresent()).toEqual(true);
//       expect(oldPasswordLabel.getText()).toEqual("Old Password");
//       expect(oldPasswordInput.isPresent()).toEqual(true);
//     });  
//   });

//   it('should have new password', () => {
//     element.all(by.css('.nav-item')).get(1).click().then(() => {
//       var newPasswordLabel = element(by.css('#new-password label'));
//       var newPasswordInput = element(by.css('#new-password input'));
//       expect(newPasswordLabel.isPresent()).toEqual(true);
//       expect(newPasswordLabel.getText()).toEqual("New Password");
//       expect(newPasswordInput.isPresent()).toEqual(true);
//     });  
//   });

//   it('should have confirm password', () => {
//     element.all(by.css('.nav-item')).get(1).click().then(() => {
//       var confirmPasswordLabel = element(by.css('#confirm-password label'));
//       var confirmPasswordInput = element(by.css('#confirm-password input'));
//       expect(confirmPasswordLabel.isPresent()).toEqual(true);
//       expect(confirmPasswordLabel.getText()).toEqual("Confirm Password");
//       expect(confirmPasswordInput.isPresent()).toEqual(true);
//     });  
//   });
// });
