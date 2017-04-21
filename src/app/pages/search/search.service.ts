import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class SearchService {

  artists: Array<any>;
  image: string;

  constructor(private http: Http) { }

  /**
   * Calls the Spotify search api to get a list of artists with their
   * name and picture.
   * 
   * @param name: name of the artist to search for
   * @param limit: limit of results to return from the search
   * @return a list of artists containing their name and picture
   */
  searchArtists(name: string, limit: string): Observable<any[]> {
    this.image = '';
    let params = new URLSearchParams();
    params.set('q', name);
    params.set('type', 'artist');
    params.set('limit', limit);
    return this.http.get('https://api.spotify.com/v1/search', { search: params })
    .map(this.extractData)
    .catch(this.handleError);
  }

  /**
   * Returns a list of artists contining their name and picture.
   * If the artist has no picture a default image is used as a replacement.
   * 
   * @param res: response from the Spotify search api
   * @return a list of artists contining their name and picture
   */
  private extractData(res: Response) {
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Bad response status: ' + res.status);
    }
    this.artists = [];
    let body = res.json();
    body.artists.items.map(artist => {
      if (artist.hasOwnProperty('images')) {
        if (artist.images.length > 1) {
          this.image = artist.images[1].url;
        } else if (artist.images.length === 1) {
          this.image =  artist.images[0].url;
        } else {
          this.image = 'http://freetwitterheaders.com/wp-content/uploads/2012/09/Gradient_02.jpg';
        }
      } else {
        this.image = 'http://freetwitterheaders.com/wp-content/uploads/2012/09/Gradient_02.jpg';
      }
      this.artists.push({image: this.image, name: artist.name});
    });
      return this.artists;
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
