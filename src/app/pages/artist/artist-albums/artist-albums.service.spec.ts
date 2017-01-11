import {
  fakeAsync,
  inject,
  TestBed
} from '@angular/core/testing';
import {
  HttpModule,
  Http,
  ResponseOptions,
  Response,
  URLSearchParams
} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { ArtistAlbumsService } from './artist-albums.service';
import mocks = require('./artist-albums.mock');

let mockRequest;

const mockArtistPictureRequest = mocks.mockArtistPictureRequest;
const mockArtistPictureResponse = mocks.mockArtistPictureResponse;
const mockArtistAlbumsRequest = mocks.mockArtistAlbumsRequest;
const mockArtistAlbumsResponse = mocks.mockArtistAlbumsResponse;
const mockAlbumTracksRequest = mocks.mockAlbumTracksRequest;
const mockAlbumTracksResponse = mocks.mockAlbumTracksResponse;

describe('ArtistAlbums Service', () => {
  let mockHttp: Http;

  beforeEach(() => {
    mockHttp = { get: null } as Http;

    spyOn(mockHttp, 'get').and.returnValue(Observable.of({
      json: () => mockRequest
    }));

    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        {
          provide: Http,
          useValue: mockHttp
        },
        ArtistAlbumsService
      ]
    });
  });

  it('should get getArtistPicture(artist) results', fakeAsync(
    inject([ArtistAlbumsService], service => {
      mockRequest = mockArtistPictureRequest;
      let artistName = 'artist1';
      let params = new URLSearchParams();
      params.set('q', 'artist1');
      params.set('type', 'artist');
      params.set('limit', '1');

      service.getArtistPicture(artistName)
        .subscribe(res => {
          expect(mockHttp.get).toHaveBeenCalledWith('https://api.spotify.com/v1/search', { search: params });
          expect(res).toEqual(mockArtistPictureResponse);
        });
    })
  ));

  it('should get getArtistAlbums(id) results', fakeAsync(
    inject([ArtistAlbumsService], service => {
      mockRequest = mockArtistAlbumsRequest;
      let artistId = '1';
      let params = new URLSearchParams();
      params.set('album_type', 'album');

      service.getArtistAlbums(artistId)
        .subscribe(res => {
          expect(mockHttp.get).toHaveBeenCalledWith('https://api.spotify.com/v1/artists/' + artistId + '/albums', { search: params });
          expect(res).toEqual(mockArtistAlbumsResponse);
        });
    })
  ));

  it('should get getAlbumTracks(albums) results', fakeAsync(
    inject([ArtistAlbumsService], service => {
      mockRequest = mockAlbumTracksRequest;
      let albumIds = service.getAlbumIds(mockArtistAlbumsResponse);
      let params = new URLSearchParams();
      params.set('ids', albumIds);

      service.getAlbumTracks(mockArtistAlbumsResponse)
        .subscribe(res => {
          expect(mockHttp.get).toHaveBeenCalledWith('https://api.spotify.com/v1/albums/', { search: params });
          expect(res).toEqual(mockAlbumTracksResponse);
        });
    })
  ));

});
