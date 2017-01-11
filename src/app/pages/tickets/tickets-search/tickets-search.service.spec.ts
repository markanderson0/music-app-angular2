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
import { TicketsSearchService } from './tickets-search.service';
import mocks = require('./tickets-search.mock');

const mockRequest = mocks.mockRequest;
const mockResponse = mocks.mockResponse;
const mockSimpleResponse = mocks.mockSimpleResponse;

const apiKey = 'XXXXX';
const endDateTime = '2018-01-01T00:00:00Z';

describe('TicketsSearch Service', () => {
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
        TicketsSearchService
      ]
    });
  });

  it('should get searchEvents(artist) results', fakeAsync(
    inject([TicketsSearchService], service => {
      let params = new URLSearchParams();
      params.set('keyword', 'artist1' + ' Music');
      params.set('endDateTime', endDateTime);
      params.set('apikey', apiKey);
      params.set('page', '0');

      service.searchEvents('artist1')
        .subscribe(res => {
          expect(mockHttp.get).toHaveBeenCalledWith('https://app.ticketmaster.com/discovery/v2/events.json', { search: params });
          expect(res).toEqual(mockResponse);
        });
    })
  ));

  it('should get simpleSearchEvents(artist) results', fakeAsync(
    inject([TicketsSearchService], service => {
      let params = new URLSearchParams();
      params.set('keyword', 'artist1' + ' Music');
      params.set('endDateTime', endDateTime);
      params.set('apikey', apiKey);
      params.set('page', '0');

      service.simpleSearchEvents('artist1')
        .subscribe(res => {
          expect(mockHttp.get).toHaveBeenCalledWith('https://app.ticketmaster.com/discovery/v2/events.json', { search: params });
          expect(res).toEqual(mockSimpleResponse);
        });
    })
  ));

});
