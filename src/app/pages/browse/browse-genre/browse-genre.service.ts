import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class BrowseGenreService {

  pageNum: number = 0;
  loadMoreArtists: boolean = true;
  videosUrl: string = '/mock-data/playlists/';
  genre: string;
  artists: any[];

  constructor(private http: Http) { }

  /**
   * Returns a list containing artists names and pictures.
   * If the same genre is requested as previous, return the
   * next page of artists for that genre. If the page number
   * is more than 4 set the 'load more' button to not be displayed.
   * 
   * @param genre: the genre of artists to retrieve
   * @return a list containing artists names and pictures
   */
  getGenrePlaylist(genre): Observable<any[]> {
    if (this.genre === genre) {
      this.pageNum++;
      if (this.pageNum >= 4) {
        this.loadMoreArtists = false;
      }
    }
    this.genre = genre;
    return this.http.get(this.videosUrl + '/' + this.genre + '/' + this.genre + this.pageNum.toString() + '.json')
    .map(this.extractData)
    .catch(this.handleError);
  }

  private extractData(res: Response) {
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Bad response status: ' + res.status);
    }
    let body = res.json();
    return body.data || { };
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
