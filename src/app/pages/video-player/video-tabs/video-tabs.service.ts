import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class VideoTabsService {

  videosUrl: string = '/mock-data/videos.json';
  swipeOptions: any;
  showId: string;
  artistName: string;

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

  getVideos(showId, artistName): Observable<any[]> {
    this.showId = showId;
    this.artistName = artistName;
    return this.http.get(this.videosUrl)
    .map((response: Response) => {
      return this.getShowDetails(response.json().data, this.showId, this.artistName);
    })
    .catch(this.handleError);
  }

  extractData(res: Response) {
    let body = res.json();
    let showDetails = this.getShowDetails(body.data, this.showId, this.artistName);
    return showDetails;
  }

  getShowDetails(videos, showId, artistName) {
    let showDetails = [];
      for (let i = 0; i < videos.length; i++) {
        if (videos[i].artist === artistName) {
          for (let j = 0; j < videos[i].shows.length; j++) {
            if (videos[i].shows[j].id === showId) {
              showDetails.push({
                date: videos[i].shows[j]['date'],
                venue: videos[i].shows[j]['venue'],
                location: videos[i].shows[j]['location'],
                videos: videos[i].shows[j]['videos']});
              return showDetails;
            }
          }
        }
      }
    }

  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
