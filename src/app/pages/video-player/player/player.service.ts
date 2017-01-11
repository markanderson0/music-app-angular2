import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class PlayerService {

  videosUrl: string = '/mock-data/videos.json';
  swipeOptions: any;
  playlistId: string;
  showId: string;
  videoId: string;
  artistName: string;

  constructor(private http: Http) { }

  getShowDetails(showId, artistName): Observable<any[]> {
    this.showId = showId;
    this.artistName = artistName;
    return this.http.get(this.videosUrl)
    .map((response: Response) => {
      return this.extractShowDetails(response.json().data, this.showId, this.artistName);
    })
    .catch(this.handleError);
  }

  extractShowDetails(videos, showId, artistName) {
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

  getVideoDetails(playlistId, showId, videoId, artistName): Observable<any[]> {
    this.playlistId = playlistId;
    this.showId = showId;
    this.videoId = videoId;
    this.artistName = artistName;
    return this.http.get(this.videosUrl)
    .map((response: Response) => {
      return this.extractVideoDetails(response.json().data, this.playlistId, this.showId, this.videoId, this.artistName);
    })
    .catch(this.handleError);
  }

  extractVideoDetails(videos, playlistId, showId, videoId, artistName) {
    let videoDetails = [];
    for (let i = 0; i < videos.length; i++) {
      if (videos[i].artist === artistName) {
        for (let j = 0; j < videos[i].shows.length; j++) {
          if (videos[i].shows[j].id === showId) {
            for (let k = 0; k < videos[i].shows[j].videos.length; k++) {
              if (videos[i].shows[j].videos[k].playlistId === playlistId) {
                for (let l = 0; l < videos[i].shows[j].videos[k].video.length; l++) {
                  if (videos[i].shows[j].videos[k].video[l].id === videoId) {
                    videoDetails.push({
                      audio: videos[i].shows[j].videos[k].video[l]['audio'],
                      video: videos[i].shows[j].videos[k].video[l]['video'],
                      views: videos[i].shows[j].videos[k].video[l]['views'],
                      songsString: videos[i].shows[j].videos[k].video[l]['songsString'],
                      time: videos[i].shows[j].videos[k].video[l]['time'],
                      file: videos[i].shows[j].videos[k].video[l]['file']
                    });
                    return videoDetails;
                  }
                }
              }
            }
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
