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

  /**
   * Returns a list of containing the names and pictures of the top tickets
   * for the selected genre.
   * 
   * @param genre: name of the genre
   * @return the top tickets for the genre
   */
  getTopTickets(genre): Observable<any[]> {
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

  /**
   * Calls the TicketMaster events api to get a list of artists with shows
   * for the selected genre.
   * 
   * If the festival genre has been selected and the name of the result contains
   * the term 'fest' it can be added to the list of tickets.
   * 
   * If the response has no results, set the loadMore boolean to false to hide
   * the corresponding button so no more results can be requested.
   * 
   * @param genreName: name of the genre
   * @param pageNum: the page number
   * @param genreItems: list of tickets for the selected genre
   * @return a list of artists with tickets available for the selected genre
   */
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
                  } else {
                    this.genreItem.push({name: item._embedded.attractions[0].name});
                  }
                }
              }
            }
          }
        });
      } else {
        this.loadMore = false;
      }
      return this.genreItem;
    });
  }

  /**
   * Increments the page number and calls getGenreTicktes to load the next
   * page of available tickets.
   * 
   * @param genreItems: a list of tickets for the selected genre
   * @return a list of artists with tickets available for the selected genre
   */
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
