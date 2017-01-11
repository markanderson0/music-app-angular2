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
import { MyUploadsService } from './my-uploads.service';
import mocks = require('./my-uploads.mock');

const mockRequest = mocks.mockRequest;
const mockResponse = mocks.mockResponse;

describe('MyUploads Service', () => {
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
        MyUploadsService
      ]
    });
  });

  it('should get my uploads results', fakeAsync(
    inject([MyUploadsService], service => {

      service.getVideos()
        .subscribe(res => {
          expect(mockHttp.get).toHaveBeenCalledWith('/mock-data/videos.json');
          expect(res).toEqual(mockResponse);
        });
    })
  ));

});
