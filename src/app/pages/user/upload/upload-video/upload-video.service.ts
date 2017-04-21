import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { ArtistShowsService } from '../../../artist/artist-shows/artist-shows.service';

@Injectable()
export class UploadVideoService {

  artist: string = '';
  events: any[] = [];
  pages: number = 1;
  currentPage: number = 1;
  songs: any[] = [];
  selected: string = '';
  eventYear: string = '';
  currentArtist: string = '';

  selectedSongs: any[] = [];
  songsList: string;
  selectedSong: string = '';
  selectedEvent: string = '';

  valid: boolean = true;

  constructor(private http: Http, private artistShowsService: ArtistShowsService) { }

  /**
   * Calls the setlist.fm api to get a list of events for an artist during
   * a given year.
   * 
   * If the current page number is less than the total number of pages, the 
   * page number is incremented, the event data is extracted from the api 
   * response and the getEvent method is called again with the new page number.
   * If there are more than one setlist returned from the response (setlist is
   * an array), then map the response to exract the data from each individual 
   * setlist. Otherwise extract the data from the single setlist.
   * 
   * @param eventYear: the year of the event
   * @param mbid: the artists MusicBrainz Id
   * @return a list of events containing its date, venue and id
   */
  getEvent(eventYear, mbid): Promise<any[]> {
    if (this.eventYear !== eventYear || this.currentArtist !== mbid) {
      this.currentArtist = mbid;
      this.eventYear = eventYear;
      this.events = [];
      this.pages = 1;
      this.currentPage = 1;
      this.clearSongs();
    }

    let params = new URLSearchParams();
    params.set('artistMbid', mbid);
    params.set('year', eventYear);
    params.set('p', this.currentPage.toString());

    return this.http.get('http://api.setlist.fm/rest/0.1/search/setlists.json', { search: params })
    .toPromise()
    .then((response: Response) => {
      // The number of pages is the total number of results / the number of items per page
      this.pages = Math.ceil(parseInt(response.json().setlists['@total'], 0) / parseInt(response.json().setlists['@itemsPerPage'], 0));
      if (this.currentPage <= this.pages) {
        this.currentPage++;
        if (response.json().setlists.setlist instanceof Array) {
          response.json().setlists.setlist.map(item => {
            this.events.push({date: item['@eventDate'], venue: item.venue['@name'], id: item['@id']});
          });
        } else {
          let date = response.json().setlists.setlist['@eventDate'];
          let venue = response.json().setlists.setlist.venue['@name'];
          let id = response.json().setlists.setlist['@id'];
          this.events.push({date: date, venue: venue, id: id});
        }
        this.getEvent(this.eventYear, mbid);
      }
      return this.events;
    }, errorCallback => {
      return this.events;
    });
  }

  /**
   * Calls the setlist.fm api to get a list of songs for a specific event.
   * 
   * To get the list of songs, the getSetlist method from the artistShowsService 
   * is called with the response from the api call.
   * 
   * @param eventId: the id of the event
   * @return a list of songs
   */
  getSongs(eventId): Observable<any[]> {
    let selectedVenue = this.events.find(event => {
      return event.id === eventId;
    }).venue;
    let selectedDate = this.events.find(event => {
      return event.id === eventId;
    }).date;
    this.selectedEvent = selectedDate + ', ' + selectedVenue;
    this.clearSongs();
    return this.http.get('http://api.setlist.fm/rest/0.1/setlist/' + eventId + '.json')
    .map((response: Response) => {
      this.songs = this.artistShowsService.getSetlist(response.json().setlist.sets);
      return this.songs;
    });
  }

  /**
   * Clear song related fields.
   */
  clearSongs() {
    this.songs = [];
    this.selected = '';
    this.selectedSong = '';
    this.selectedSongs = [];
  }

  /**
   * Checks each song in the songs list and adds the song to the selectedSongs 
   * list if the songs selected flag is set to true.
   * 
   * @param songs: a list containing a songs id, name, and selected boolean
   */
  selectSong(songs) {
    songs.forEach((song) => {
      if (song.selected) {
        this.selectedSongs.push(song.label);
      }
    });
  }

  /**
   * Sets the songsList to match the one in the component.
   * 
   * @param songsList: string of the selected songs
   */
  setSongsList(songsList) {
    this.songsList = songsList;
  }

  /**
   * @return an ampty lsit of songs.
   */
  clearSongsList() {
    return this.songsList = '';
  }

  /**
   * Toggle the validity of the upload form.
   */
  setValid(valid: boolean) {
    this.valid = valid;
  }

}
