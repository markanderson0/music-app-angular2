// describe('Artist Albums', () => {

//   beforeEach(() => {
//     browser.get('/artist/Radiohead/albums');
//   });

//   it('should have <artist-albums>', () => {
//     var artistAlbums = element(by.css('my-app artist-albums'));
//     expect(artistAlbums.isPresent()).toEqual(true);
//   });

//   it('should have <panel>', () => {
//     var panel = element(by.css('my-app panel'));
//     expect(panel.isPresent()).toEqual(true);
//   });

//   it('should have <img>', () => {
//     var img = element(by.css('my-app panel img'));
//     expect(img.isPresent()).toEqual(true);
//   });

//   it('should have album cover', () => {
//     var albumCover = element(by.css('#artist-album-pic'));
//     expect(albumCover.isPresent()).toEqual(true);
//   });

//   it('should have album name', () => {
//     var albumName = element.all(by.css('.artist-album-name')).get(0);
//     expect(albumName.isPresent()).toEqual(true);
//     expect(albumName.getText()).toEqual("A Moon Shaped Pool");
//   });

//   
//   it('should have album release year', () => {
//     var albumYear = element.all(by.css('.artist-album-name')).get(1);
//     expect(albumYear.isPresent()).toEqual(true);
//     expect(albumYear.getText()).toEqual("2016");
//   });

//   it('should have track number', () => {
//     var trackNum = element.all(by.css('.artist-album-songs')).get(0);
//     expect(trackNum.isPresent()).toEqual(true);
//     expect(trackNum.getText()).toEqual("1.");
//   });

//   it('should have song name', () => {
//     var songName = element.all(by.css('.artist-album-songs')).get(1);
//     expect(songName.isPresent()).toEqual(true);
//     expect(songName.getText()).toEqual("Burn the Witch");
//   });
// });
