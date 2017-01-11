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
import { PlayerService } from './player.service';
import mocks = require('./player.mock');

let mockRequest;

const mockShowDetailsRequest = mocks.mockShowDetailsRequest;
const mockShowDetailsResponse = mocks.mockShowDetailsResponse;
const mockVideoDetailsResponse = mocks.mockVideoDetailsResponse;

describe('Player Service', () => {
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
        PlayerService
      ]
    });
  });

  it('should get getShowDetails(showId, artistName) results', fakeAsync(
    inject([PlayerService], service => {
      mockRequest = mockShowDetailsRequest;
      let showId = 'show123';
      let artistName = 'artist1';

      service.getShowDetails(showId, artistName)
        .subscribe(res => {
          expect(mockHttp.get).toHaveBeenCalledWith('/mock-data/videos.json');
          expect(res).toEqual(mockShowDetailsResponse);
        });
    })
  ));

  it('should get getVideoDetails(playlistId, showId, videoId, artistName) results', fakeAsync(
    inject([PlayerService], service => {
      mockRequest = mockShowDetailsRequest;
      let playlistId = 'p123';
      let showId = 'show123';
      let videoId = 'vid123';
      let artistName = 'artist1';

      service.getVideoDetails(playlistId, showId, videoId, artistName)
        .subscribe(res => {
          expect(mockHttp.get).toHaveBeenCalledWith('/mock-data/videos.json');
          expect(res).toEqual(mockVideoDetailsResponse);
        });
    })
  ));

});
