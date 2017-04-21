import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ArtistShowsService } from '../../artist/artist-shows/artist-shows.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class VideoSidebarService {

  videosUrl: string = '/mock-data/videos.json';
  playlistId: string;
  showId: string;
  artistName: string;

  constructor(private http: Http, private artistShowsService: ArtistShowsService) { }

  /**
   * Retrieves the details of each playlist for a particular show from
   * local storage.
   * 
   * @param playlistId: a playlists id
   * @param showId: a shows id
   * @param artistName: an artists name
   * @return a list of playlists for a show
   */
  getVideos(playlistId, showId, artistName): Observable<any[]> {
    this.playlistId = playlistId;
    this.showId = showId;
    this.artistName = artistName;
    return this.http.get(this.videosUrl)
    .map((response: Response) => {
      return this.getShowDetails(response.json().data, this.playlistId, this.showId, this.artistName);
    })
    .catch(this.handleError);
  }

  /**
   * Extracts all of the playlists for a particular show from the list
   * of all videos regarding the selected artist.
   * 
   * @param videos: a list of videos
   * @param playlistId: a playlists id
   * @param showId: a shows id
   * @param artistName: an artists name
   * @return a list of playlists for a show
   */
  getShowDetails(videos, playlistId, showId, artistName) {
    let playlistDetails = [];
    for (let i = 0; i < videos.length; i++) {
      if (videos[i].artist === artistName) {
        for (let j = 0; j < videos[i].shows.length; j++) {
          if (videos[i].shows[j].id === showId) {
            for (let k = 0; k < videos[i].shows[j].videos.length; k++) {
              if (videos[i].shows[j].videos[k].playlistId === playlistId) {
                for (let l = 0; l < videos[i].shows[j].videos[k].video.length; l++) {
                  playlistDetails.push({
                    id: videos[i].shows[j].videos[k].video[l]['id'],
                    file: videos[i].shows[j].videos[k].video[l]['file'],
                    image: videos[i].shows[j].videos[k].video[l]['image'],
                    audio: videos[i].shows[j].videos[k].video[l]['audio'],
                    video: videos[i].shows[j].videos[k].video[l]['video'],
                    views: videos[i].shows[j].videos[k].video[l]['views'],
                    songs: videos[i].shows[j].videos[k].video[l]['songs'],
                    songsString: videos[i].shows[j].videos[k].video[l]['songsString'],
                    time: videos[i].shows[j].videos[k].video[l]['time'],
                    date: videos[i].shows[j]['date'],
                    venue: videos[i].shows[j]['venue'],
                    location: videos[i].shows[j]['location'],
                  });
                }
                return playlistDetails;
              }
            }
          }
        }
      }
    }
  }

  /**
   * Calls the setlist.fm api to get the setlist of a particular event.
   * 
   * @param artist: an artists name
   * @param eventDate: the date of an event
   * @param eventVenue: the venue of an event
   * @param eventLocation: the location of an event
   * @return the setlist of an event
   */
  getSetlist(artist, eventDate, eventVenue, eventlocation): Observable<any[]> {
    let params = new URLSearchParams();
    params.set('artistName', artist);
    params.set('date', eventDate);
    params.set('venueName', eventVenue);
    params.set('locationName', eventlocation);
    return this.http.get('http://api.setlist.fm/rest/0.1/search/setlists.json', { search: params })
    .map((response: Response) => {
      console.log('res' + JSON.stringify(response.json()));
      return this.artistShowsService.getSetlist(response.json().setlists.setlist.sets);
    }, errorCallback => {
      return;
    });
  }

  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
