import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class TicketsGenreService {

  genres: any[];
  oldSearch: string = '';
  topEvents: any[];
  genreItem: any[] = [];
  pageNo: number = 0;
  items: number;
  loadMore: boolean = true;

  apiKey: string = 'XXXXX';
  endDateTime: string = '2018-01-01T00:00:00Z';
  ticketsUrl: string = '/mock-data/tickets/';

  constructor(private http: Http) { }

  getTickets(genre): Observable<any[]> {
    return this.http.get(this.ticketsUrl + genre + '.json')
    .map((response: Response) => {
      return response.json().data;
    })
    .catch(this.handleError);
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  getGenreTickets(genreName, pageNum, genreItems): Promise<any[]> {
    this.oldSearch = genreName;
    this.genreItem = genreItems;
    this.loadMore = true;
    let params = new URLSearchParams();
    params.set('keyword', genreName);
    params.set('endDateTime', this.endDateTime);
    params.set('apikey', this.apiKey);
    params.set('page', pageNum);
    return this.http.get('https://app.ticketmaster.com/discovery/v2/events.json', { search: params })
    .toPromise()
    .then((response: Response) => {
      if (response.json().hasOwnProperty('_embedded')) {
        response.json()._embedded.events.map(item => {
          if (item.hasOwnProperty('_embedded')) {
            if (item._embedded.hasOwnProperty('attractions')) {
              if (item._embedded.attractions[0].hasOwnProperty('name')) {
                if ((!(this.in_array(this.genreItem, 'name', item._embedded.attractions[0].name)))
                  && (item._embedded.attractions[0].name !== '') && item.classifications[0].segment.name === 'Music') {
                  if (genreName === 'festival') {
                    if (item.name.toLowerCase().indexOf('fest') > -1) {
                      this.genreItem.push({name: item.name});
                    }
                  }
                  else {
                    console.log('genreItemName: ' + item._embedded.attractions[0].name);
                    this.genreItem.push({name: item._embedded.attractions[0].name});
                  }
                }
              }
            }
          }
        });
      }
      else {
        this.loadMore = false;
      }
      return this.genreItem;
    });
  }

  getMoreResults(genreItems) {
    this.pageNo++;
    return this.getGenreTickets(this.oldSearch, this.pageNo, genreItems);
  };

  in_array(array, key, val): boolean {
    for (let i = 0 ; i < array.length; i++) {
        if (array[i][key] === val) {
          return true;
        }
    }
    return false;
  }
}
