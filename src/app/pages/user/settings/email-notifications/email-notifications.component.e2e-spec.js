// describe('Email Notifications', () => {

//   beforeEach(() => {
//     browser.get('/profile/settings');
//   });

//   it('should have <email-notifications>', () => {
//     var emailNotifications = element(by.css('my-app email-notifications'));
//     expect(emailNotifications.isPresent()).toEqual(true);
//   });

//   it('should have <panel>', () => {
//     var panel = element(by.css('my-app panel'));
//     expect(panel.isPresent()).toEqual(true);
//   });

//   it('should have notification option 1', () => {
//     element.all(by.css('.nav-item')).get(3).click().then(() => {
//       var privacy1Label = element(by.css('#notification1'));
//       var privacy1Input = element.all(by.css('input')).get(0);
//       expect(privacy1Label.isPresent()).toEqual(true);
//       expect(privacy1Label.getText()).toEqual("Recieve weekly updates on the artists you follow");
//       expect(privacy1Input.isPresent()).toEqual(true);
//     });  
//   });

//   it('should have notification option 2', () => {
//     element.all(by.css('.nav-item')).get(3).click().then(() => {
//       var privacy1Label = element(by.css('#notification2'));
//       var privacy1Input = element.all(by.css('input')).get(1);
//       expect(privacy1Label.isPresent()).toEqual(true);
//       expect(privacy1Label.getText()).toEqual("Recieve updates on new and exciting features coming to you soon!");
//       expect(privacy1Input.isPresent()).toEqual(true);
//     });  
//   });
// });
