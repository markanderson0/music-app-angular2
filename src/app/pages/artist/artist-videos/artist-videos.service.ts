import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ArtistVideosService {

  videosUrl: string = '/mock-data/videos.json';
  swipeOptions: any;
  artistName: string;
  videoSortOptions = 'Most Popular (Playlist),Most Popular (Videos),Highest Rated,Highest Rated (Audio),Highest Rated (Video)';

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

  getVideos(artistName): Observable<any[]> {
    this.artistName = artistName;
    return this.http.get(this.videosUrl)
    .map((response: Response) => {
      return this.getShows(response.json().data, this.artistName);
    })
    .catch(this.handleError);
  }

  getShows(videos, artistName) {
    for (let i = 0; i < videos.length; i++) {
      if (videos[i].artist === artistName) {
        return videos[i].shows;
      }
    }
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
