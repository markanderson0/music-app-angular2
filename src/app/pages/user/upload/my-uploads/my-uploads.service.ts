import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class MyUploadsService {

  videoId: string = '';
  songs: any[] = [];


  videosUrl: string = '/mock-data/videos.json';
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
      .map((response: Response) => {
        return this.getUserVideos(response.json().data, 'testUser1');
      })
      .catch(this.handleError);
  }

  getUserVideos(videos, user) {
    let userVideos = [];
    for (let i = 0; i < videos.length; i++) {
      for (let j = 0; j < videos[i].shows.length; j++) {
        for (let k = 0; k < videos[i].shows[j].videos.length; k++) {
          if (videos[i].shows[j].videos[k].user === user) {

            let show = {
              date: videos[i].shows[j]['date'],
              venue: videos[i].shows[j]['venue'],
              location: videos[i].shows[j]['location'],
              id: videos[i].shows[j]['id'],
              playlistId: videos[i].shows[j].videos[k]['playlistId'],
              videos: videos[i].shows[j].videos[k]['video']
            };

            if (userVideos.length > 0) {
              let added = false;
              for (let l = 0; l < userVideos.length; l++) {
                if (userVideos[l]['artistId'] === videos[i]['id']) {
                  userVideos[l].shows.push(show);
                  added = true;
                }
              }
              if (!added) {
                userVideos.push({
                  artistId: videos[i]['id'],
                  artistName: videos[i]['artist'],
                  shows: [show]
                });
              }
            }
            else {
              userVideos.push({
                artistId: videos[i]['id'],
                artistName: videos[i]['artist'],
                shows: [show]
              });

            }
          }
        }
      }
    }
    return userVideos;
  }

  editVideoConfig(songs, videoId) {
    console.log('service');
    this.songs = songs;
    this.videoId = videoId;
  }

  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  getSwipeOptions() {
    return this.swipeOptions;
  }

}
