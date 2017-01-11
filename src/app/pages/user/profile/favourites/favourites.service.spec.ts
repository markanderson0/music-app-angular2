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
import { FavouritesService } from './favourites.service';
import mocks = require('./favourites.mock');

const mockRequest = mocks.mockRequest;
const mockResponse = mocks.mockResponse;

describe('Favourites Service', () => {
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
        FavouritesService
      ]
    });
  });

  it('should get Favourites results', fakeAsync(
    inject([FavouritesService], service => {

      service.getFavourites()
        .subscribe(res => {
          expect(mockHttp.get).toHaveBeenCalledWith('/mock-data/favourites.json');
          expect(res).toEqual(mockResponse);
        });
    })
  ));

});
