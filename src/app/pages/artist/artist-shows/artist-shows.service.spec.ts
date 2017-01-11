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
import { ArtistShowsService } from './artist-shows.service';
import mocks = require('./artist-shows.mock');

let mockRequest;

const mockNameRequest = mocks.mockNameRequest;
const mockNameResponse = mocks.mockNameResponse;
const mockArtistRequest = mocks.mockArtistRequest;
const mockArtistResponse = mocks.mockArtistResponse;
const mockArtistShowsRequest = mocks.mockArtistShowsRequest;
const mockArtistShowsResponse = mocks.mockArtistShowsResponse;

describe('ArtistShows Service', () => {
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
        ArtistShowsService
      ]
    });
  });

  it('should get getName(name) results', fakeAsync(
    inject([ArtistShowsService], service => {
      mockRequest = mockNameRequest;
      let name = 'artist1';
      let params = new URLSearchParams();
      params.set('q', name);
      params.set('type', 'artist');
      params.set('limit', '1');

      service.getName(name)
        .subscribe(res => {
          expect(mockHttp.get).toHaveBeenCalledWith('https://api.spotify.com/v1/search', { search: params });
          expect(res).toEqual(mockNameResponse);
        });
    })
  ));

  it('should get getArtist(name) results', fakeAsync(
    inject([ArtistShowsService], service => {
      mockRequest = mockArtistRequest;
      let name = mockNameResponse;
      let params = new URLSearchParams();
      params.set('artistName', name);
      params.set('p', '1');

      service.getArtist(name)
        .subscribe(res => {
          expect(mockHttp.get).toHaveBeenCalledWith('http://api.setlist.fm/rest/0.1/search/setlists.json', { search: params });
          expect(res).toEqual(mockArtistResponse);
        });
    })
  ));

  it('should get getArtistShows(mbid, pageNum) results', fakeAsync(
    inject([ArtistShowsService], service => {
      mockRequest = mockArtistShowsRequest;
      let mbid = mockArtistResponse;
      let pageNum = '1';
      let params = new URLSearchParams();
      params.set('artistMbid', mbid);
      params.set('p', pageNum);

      service.getArtistShows(mbid, pageNum)
        .subscribe(res => {
          expect(mockHttp.get).toHaveBeenCalledWith('http://api.setlist.fm/rest/0.1/search/setlists.json', { search: params });
          expect(res).toEqual(mockArtistShowsResponse);
        });
    })
  ));

});
