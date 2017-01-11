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
import { ArtistVideosService } from './artist-videos.service';
import mocks = require('./artist-videos.mock');

const mockRequest = mocks.mockRequest;
const mockResponse = mocks.mockResponse;

describe('ArtistVideos Service', () => {
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
        ArtistVideosService
      ]
    });
  });

  it('should get getVideos(artistName) results', fakeAsync(
    inject([ArtistVideosService], service => {
      let artistName = 'artist1';

      service.getVideos(artistName)
        .subscribe(res => {
          expect(mockHttp.get).toHaveBeenCalledWith('/mock-data/videos.json');
          expect(res).toEqual(mockResponse);
        });
    })
  ));

});
