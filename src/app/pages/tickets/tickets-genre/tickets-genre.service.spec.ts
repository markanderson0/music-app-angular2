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
import { TicketsGenreService } from './tickets-genre.service';
import mocks = require('./tickets-genre.mock');

const mockRequest = mocks.mockRequest;
const mockResponse = mocks.mockResponse;

describe('TicketsGenre Service', () => {
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
        TicketsGenreService
      ]
    });
  });

  it('should get tickets results', fakeAsync(
    inject([TicketsGenreService], service => {
      const expectedUrl = ['/mock-data/tickets/alt.json'];

      service.getTickets('alt')
        .subscribe(res => {
          expect(mockHttp.get).toHaveBeenCalledWith('/mock-data/tickets/alt.json');
          expect(res).toEqual(mockResponse);
        });
    })
  ));

});
