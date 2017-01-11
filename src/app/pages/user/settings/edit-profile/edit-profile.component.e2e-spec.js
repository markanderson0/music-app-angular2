// describe('Edit Profile', () => {

//   beforeEach(() => {
//     browser.get('/profile/settings');
//   });

//   it('should have <edit-profile>', () => {
//     var editProfile = element(by.css('my-app edit-profile'));
//     expect(editProfile.isPresent()).toEqual(true);
//   });

//   it('should have <panel>', () => {
//     var panel = element(by.css('my-app panel'));
//     expect(panel.isPresent()).toEqual(true);
//   });

//   it('should have user picture', () => {
//     element.all(by.css('.nav-item')).get(0).click().then(() => {
//       var userPic = element(by.css('.userpic-wrapper img'));
//       expect(userPic.isPresent()).toEqual(true);
//     });  
//   });

//   it('should have banner pic', () => {
//     element.all(by.css('.nav-item')).get(0).click().then(() => {
//       var bannerPic = element(by.css('.bannerpic-wrapper img'));
//       expect(bannerPic.isPresent()).toEqual(true);
//     });  
//   });

//   it('should have email input', () => {
//     element.all(by.css('.nav-item')).get(0).click().then(() => {
//       var emailLabel = element(by.css('#edit-email label'));
//       var emailInput = element(by.css('#edit-email input'));
//       expect(emailLabel.isPresent()).toEqual(true);
//       expect(emailLabel.getText()).toEqual("Email");
//       expect(emailInput.isPresent()).toEqual(true);
//     });  
//   });

//   it('should have dob input', () => {
//     element.all(by.css('.nav-item')).get(0).click().then(() => {
//       var dobLabel = element(by.css('#dob label'));
//       var day = element(by.css('#form-day'));
//       var month = element(by.css('#form-month'));
//       var year = element(by.css('#form-year'));
//       expect(dobLabel.isPresent()).toEqual(true);
//       expect(dobLabel.getText()).toEqual("Date of Birth");
//       expect(day.isPresent()).toEqual(true);
//       expect(month.isPresent()).toEqual(true);
//       expect(year.isPresent()).toEqual(true);
//     });  
//   });

//   it('should have update profile button', () => {
//     element.all(by.css('.nav-item')).get(0).click().then(() => {
//       var submitBtn = element(by.css('.save-profile'));
//       expect(submitBtn.isPresent()).toEqual(true);
//       expect(submitBtn.getText()).toEqual("Update Profile");
//     });  
//   });
// });
