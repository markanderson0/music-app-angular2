import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ArtistProfileService {

  videosUrl: string = '/mock-data/topVideos.json';
  swipeOptions: any;

  constructor(private http: Http) {
    this.swipeOptions = {
      slidesPerView: 5,
      nextButton: '.swiper-button-next',
      prevButton: '.swiper-button-prev',
      slidesPerGroup: 5,
      loop: false,
      'pagination-is-active': true,
      spaceBetween: 0,
        breakpoints: {
            1700: {
                slidesPerView: 4,
                spaceBetween: 0,
                slidesPerGroup: 4
            },
            1450: {
                slidesPerView: 3,
                spaceBetween: 0,
                slidesPerGroup: 3
            },
            1025: {
                slidesPerView: 3,
                spaceBetween: 0,
                slidesPerGroup: 3
            },
            890: {
                slidesPerView: 2,
                spaceBetween: 0,
                slidesPerGroup: 2
            },
            600: {
                slidesPerView: 1,
                spaceBetween: 0,
                slidesPerGroup: 1
            }
        }
    };
  }

  getVideos(): Observable<any[]> {
    return this.http.get(this.videosUrl)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body.data || { };
  }

  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
