// import {
//   fakeAsync,
//   inject,
//   TestBed
// } from '@angular/core/testing';
// import {
//   HttpModule,
//   Http,
//   ResponseOptions,
//   Response,
//   URLSearchParams
// } from '@angular/http';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/of';
// import 'rxjs/Rx';
// import { UploadVideoService } from './upload-video.service';
// import { ArtistShowsService } from '../../../artist/artist-shows/artist-shows.service';

// const mockRequest =
// {
//   'data': [
//     {
//       'id': '123qwe',
//       'artist': 'Radiohead',
//       'shows': [
//         {
//           'id': 'show123',
//           'date': '08-07-2016',
//           'venue': 'Passeio Marítimo de Algés',
//           'location': 'Oeiras, Portugal',
//           'videos': [
//             {
//               'user': 'testUser1',
//               'playlistId': 'p123',
//               'video': [
//                 {
//                   'id': 'vid123',
//                   'file': 'http://static.videogular.com/assets/videos/videogular.mp4',
//                   'image': 'https://cdn.pixabay.com/photo/2015/07/30/17/24/audience-868074_960_720.jpg',
//                   'songs': [
//                     'Everything In Its Right Place'
//                   ],
//                   'songsString': 'Everything In Its Right Place',
//                   'time': '20:00',
//                   'views': 100,
//                   'audio': 5,
//                   'video': 7
//                 }
//               ]
//             }
//           ]
//         }
//       ]
//     },
//     {
//       'id': '234wer',
//       'artist': 'Red Hot Chili Peppers',
//       'shows': [
//         {
//           'id': 'show456',
//           'date': '15-07-2016',
//           'venue': 'Le Breton Festival Park',
//           'location': 'Ottawa, Canada',
//           'videos': [
//             {
//               'user': 'testUser2',
//               'playlistId': 'p789',
//               'video': [
//                 {
//                   'id': 'vid123',
//                   'file': 'http://static.videogular.com/assets/videos/videogular.mp4',
//                   'image': 'https://cdn.pixabay.com/photo/2015/07/30/17/24/audience-868074_960_720.jpg',
//                   'songs': [
//                     'Cant Stop'
//                   ],
//                   'songsString': 'Cant Stop',
//                   'time': '20:00',
//                   'views': 86,
//                   'audio': 5,
//                   'video': 6
//                 }
//               ]
//             }
//           ]
//         }
//       ]
//     }
//   ]
// };

// const mockResponse =
//   [
//     {
//       'artistId': '123qwe',
//       'artistName': 'Radiohead',
//       'shows': [
//         {
//           'date': '08-07-2016',
//           'venue': 'Passeio Marítimo de Algés',
//           'location': 'Oeiras, Portugal',
//           'id': 'show123',
//           'playlistId': 'p123',
//           'videos': [
//             {
//               'id': 'vid123',
//               'file': 'http://static.videogular.com/assets/videos/videogular.mp4',
//               'image': 'https://cdn.pixabay.com/photo/2015/07/30/17/24/audience-868074_960_720.jpg',
//               'songs': [
//                 'Everything In Its Right Place'
//               ],
//               'songsString': 'Everything In Its Right Place',
//               'time': '20:00',
//               'views': 100,
//               'audio': 5,
//               'video': 7
//             }
//           ]
//         }
//       ]
//     },
//   ];

// describe('UploadVideo Service', () => {
//   let mockHttp: Http;

//   beforeEach(() => {
//     mockHttp = { get: null } as Http;

//     spyOn(mockHttp, 'get').and.returnValue(Promise.resolve({
//       json: () => mockRequest
//     }));

//     TestBed.configureTestingModule({
//       imports: [HttpModule],
//       providers: [
//         {
//           provide: Http,
//           useValue: mockHttp
//         },
//         UploadVideoService,
//         ArtistShowsService
//       ]
//     });
//   });

//   it('should get upload video results', fakeAsync(
//     inject([UploadVideoService], service => {
//       let params = new URLSearchParams();
//       params.set('artistMbid', '123');
//       params.set('year', '2016');
//       params.set('p', '0');

//       service.getEvent('2016', '123')
//         .subscribe(res => {
//           // expect(mockHttp.get).toHaveBeenCalledWith('http://api.setlist.fm/rest/0.1/search/setlists.json', { search: params });
//           // expect(res).toEqual(mockResponse);
//         });
//     })
//   ));

// });
