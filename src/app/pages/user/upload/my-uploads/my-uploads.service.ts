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

  /**
   * Retrieves the videos data from local storage and calls the getUserVideos
   * method to extract the videos uploaded by the selected user.
   * 
   * @return a list of videos uploaded by the selected user.
   */
  getVideos(): Observable<any[]> {
    return this.http.get(this.videosUrl)
      .map((response: Response) => {
        return this.getUserVideos(response.json().data, 'testUser1');
      })
      .catch(this.handleError);
  }

  /**
   * Takes a list of videos and extracts only the videos that have been
   * uploaded by the desired user.
   * 
   * The for loops follow the following format:
   * ->for all all artists videos
   *  ->for all shows by each artist
   *   ->for all videos in a show
   *    ->if the current videos uploader is the desired user
   *      ->extract the details of the video
   *      ->if any videos from the desired user have been extracted yet
   *        ->for all videos that have been uploaded by this user
   *          ->if there are already videos from an artist
   *            ->add the details of the extracted video under that artists field in the list
   *        ->if no videos of the artist have been extracted already
   *          ->make a new field in the videos list for that artist and add the show
   *        ->else, no videos have been extracted yet so make a new field for the artist and add the show  
   * 
   * @param videos: a list of videos
   * @param user: the name of the user that uploaded the videos
   * @return a list of videos that the user uploader
   */
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
            } else {
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

  /**
   * Stores the songs and id of the selected video for displaying in the
   * edit video modal.
   */
  editVideoConfig(songs, videoId) {
    console.log('service');
    this.songs = songs;
    this.videoId = videoId;
  }

  handleError (error: any) {
    let errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  /**
   * @return the swipe options for the carousel
   */
  getSwipeOptions() {
    return this.swipeOptions;
  }

}
