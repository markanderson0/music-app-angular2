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
import { SearchService } from './search.service';
import mocks = require('./search.mock');

const mockRequest = mocks.mockRequest;
const mockResponse = mocks.mockResponse;

describe('Search Service', () => {
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
        SearchService
      ]
    });
  });

  it('should get search results', fakeAsync(
    inject([SearchService], service => {
      let params = new URLSearchParams();
      params.set('q', 'Muse');
      params.set('type', 'artist');
      params.set('limit', '2');
      const expectedUrl = ['https://api.spotify.com/v1/search', { search: params }];

      service.searchArtists('Muse', '2')
        .subscribe(res => {
          expect(mockHttp.get).toHaveBeenCalledWith('https://api.spotify.com/v1/search', { search: params });
          expect(res).toEqual(mockResponse);
        });
    })
  ));

});
