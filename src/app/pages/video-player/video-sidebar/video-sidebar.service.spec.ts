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
import { VideoSidebarService } from './video-sidebar.service';
import { ArtistShowsService } from '../../artist/artist-shows/artist-shows.service';
import mocks = require('./video-sidebar.mock');

let mockRequest;

const mockVideosRequest = mocks.mockVideosRequest;
const mockVideosResponse = mocks.mockVideosResponse;
const mockSetlistRequest = mocks.mockSetlistRequest;
const mockSetlistResponse = mocks.mockSetlistResponse;

describe('VideoSidebar Service', () => {
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
        VideoSidebarService,
        ArtistShowsService
      ]
    });
  });

  it('should get getVideos(playlistId, showId, artistName) results', fakeAsync(
    inject([VideoSidebarService], service => {
      mockRequest = mockVideosRequest;
      let playlistId = 'p123';
      let showId = 'show123';
      let artistName = 'artist1';

      service.getVideos(playlistId, showId, artistName)
        .subscribe(res => {
          expect(mockHttp.get).toHaveBeenCalledWith('/mock-data/videos.json');
          expect(res).toEqual(mockVideosResponse);
        });
    })
  ));

  it('should get getSetlist(artist, eventDate, eventVenue, eventlocation) results', fakeAsync(
    inject([VideoSidebarService, ArtistShowsService], service => {
      mockRequest = mockSetlistRequest;
      let artist = 'artist1';
      let eventDate = '01-01-2016';
      let eventVenue = 'ven1';
      let eventlocation = 'city1, country1';
      let params = new URLSearchParams();
      params.set('artistName', artist);
      params.set('date', eventDate);
      params.set('venueName', eventVenue);
      params.set('locationName', eventlocation);

      service.getSetlist(artist, eventDate, eventVenue, eventlocation)
        .subscribe(res => {
          expect(mockHttp.get).toHaveBeenCalledWith('http://api.setlist.fm/rest/0.1/search/setlists.json', { search: params });
          expect(res).toEqual(mockSetlistResponse);
        });
    })
  ));

});
