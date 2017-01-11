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
import { FollowingService } from './following.service';
import mocks = require('./following.mock');

const mockRequest = mocks.mockRequest;
const mockResponse = mocks.mockResponse;

describe('Following Service', () => {
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
        FollowingService
      ]
    });
  });

  it('should get following results', fakeAsync(
    inject([FollowingService], service => {
      const expectedUrl = ['/mock-data/following.json'];

      service.getFollowingArtists()
        .subscribe(res => {
          expect(mockHttp.get).toHaveBeenCalledWith('/mock-data/following.json');
          expect(res).toEqual(mockResponse);
        });
    })
  ));

});
