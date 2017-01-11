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
import { VideoTabsService } from './video-tabs.service';
import mocks = require('./video-tabs.mock');

const mockRequest = mocks.mockRequest;
const mockResponse = mocks.mockResponse;

describe('VideoTabs Service', () => {
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
        VideoTabsService
      ]
    });
  });

  it('should get getVideos(showId, artistName) results', fakeAsync(
    inject([VideoTabsService], service => {
      let showId = 'show123';
      let artistName = 'artist1';

      service.getVideos(showId, artistName)
        .subscribe(res => {
          expect(mockHttp.get).toHaveBeenCalledWith('/mock-data/videos.json');
          expect(res).toEqual(mockResponse);
        });
    })
  ));

});
