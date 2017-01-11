// describe('Merch Product', () => {

//   beforeEach(() => {
//     browser.get('/merch/product/123');
//   });

//   it('should have <merch-product>', () => {
//     var merchProduct = element(by.css('my-app merch-product'));
//     expect(merchProduct.isPresent()).toEqual(true);
//   });

//   it('should have <panel>', () => {
//     var panel = element(by.css('my-app panel'));
//     expect(panel.isPresent()).toEqual(true);
//   });

//   it('should have item picture', () => {
//     var pic = element(by.css('#merch-pic'));
//     expect(pic.isPresent()).toEqual(true);
//   });

//   it('should have item name', () => {
//     var name = element(by.css('#merch-name'));
//     expect(name.isPresent()).toEqual(true);
//   });

//   it('should have item price', () => {
//     var price = element(by.css('#merch-price'));
//     expect(price.isPresent()).toEqual(true);
//   });

//   it('should have item sizes', () => {
//     var size = element(by.css('#merch-size'));
//     var sizeLabel = element(by.css('#merch-size-label'));
//     expect(size.isPresent()).toEqual(true);
//     expect(sizeLabel.isPresent()).toEqual(true);
//     expect(sizeLabel.getText()).toContain("Size:");
//   });

//   it('should have item quantity', () => {
//     var quantity = element(by.css('#merch-quantity'));
//     var quantityLabel = element(by.css('#merch-quantity-label'));
//     expect(quantity.isPresent()).toEqual(true);
//     expect(quantityLabel.isPresent()).toEqual(true);
//     expect(quantityLabel.getText()).toContain("Quantity:");
//   });
// });
