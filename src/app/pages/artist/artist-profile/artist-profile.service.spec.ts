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
import { ArtistProfileService } from './artist-profile.service';
import mocks = require('./artist-profile.mock');

const mockRequest = mocks.mockRequest;
const mockResponse = mocks.mockResponse;

describe('ArtistProfile Service', () => {
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
        ArtistProfileService
      ]
    });
  });

  it('should get getVideos() results', fakeAsync(
    inject([ArtistProfileService], service => {

      service.getVideos()
        .subscribe(res => {
          expect(mockHttp.get).toHaveBeenCalledWith('/mock-data/topVideos.json');
          expect(res).toEqual(mockResponse);
        });
    })
  ));

});
