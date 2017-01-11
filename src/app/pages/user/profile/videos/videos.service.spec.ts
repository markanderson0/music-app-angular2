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
import { VideosService } from './videos.service';
import mocks = require('./videos.mock');

const mockRequest = mocks.mockRequest;

const mockResponse = mocks.mockResponse;

describe('Videos Service', () => {
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
        VideosService
      ]
    });
  });

  it('should get Videos results', fakeAsync(
    inject([VideosService], service => {
      service.getVideos()
        .subscribe(res => {
          expect(mockHttp.get).toHaveBeenCalledWith('/mock-data/videos.json');
          expect(res).toEqual(mockResponse);
        });
    })
  ));

});
