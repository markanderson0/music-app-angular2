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

  /**
   * Retrieves the details of a show from local storage.
   * 
   * @param showId: id of the show
   * @param artistName: name of the artist
   * @return a list containing a shows date, venue, location, and videos
   */
  getShowDetails(showId, artistName): Observable<any[]> {
    this.showId = showId;
    this.artistName = artistName;
    return this.http.get(this.videosUrl)
    .map((response: Response) => {
      return this.extractShowDetails(response.json().data, this.showId, this.artistName);
    })
    .catch(this.handleError);
  }

  /**
   * Extracts the date, venue, location, and videos for a particular show.
   * 
   * @param videos: a list of videos
   * @param showId: a shows id
   * @param artistName: an artists name
   * @return a list containing a shows date, venue, location, and videos
   */
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

  /**
   * Retrieves the details of a video from local storage.
   * 
   * @param playlistId: a playlists id
   * @param showId: a shows id
   * @param videoId: a videos id
   * @param artistName: an artists name
   * @return a list containing the audio and video ratings, views, time,
   * songs, and file for the selected video
   */
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

  /**
   * Extracts the audio and video ratings, views, time, songs, and file 
   * for the selected video.
   * 
   * @param videos: a list of videos
   * @param playlistId: a playlists id
   * @param showId: a shows id
   * @param videoId: a videos id
   * @param artistName: an artists name
   * @return a list containing the audio and video ratings, views, time,
   * songs, and file for the selected video
   */
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
