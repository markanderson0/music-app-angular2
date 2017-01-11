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
import { BrowseGenreService } from './browse-genre.service';
import mocks = require('./browse-genre.mock');

const mockRequest = mocks.mockRequest;
const mockResponse = mocks.mockResponse;

describe('BrowseGenre Service', () => {
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
        BrowseGenreService
      ]
    });
  });

  it('should get getGenrePlaylist(genre) results', fakeAsync(
    inject([BrowseGenreService], service => {
      let genre = 'rock';

      service.getGenrePlaylist(genre)
        .subscribe(res => {
          expect(mockHttp.get).toHaveBeenCalledWith('/mock-data/playlists//rock/rock0.json');
          expect(res).toEqual(mockResponse);
        });
    })
  ));

});
