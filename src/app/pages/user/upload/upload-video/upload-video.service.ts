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
      this.pages = Math.ceil(parseInt(response.json().setlists['@total'], 0) / parseInt(response.json().setlists['@itemsPerPage'], 0));
      if (this.currentPage <= this.pages) {
        this.currentPage++;
        if (response.json().setlists.setlist instanceof Array) {
          response.json().setlists.setlist.map(item => {
            this.events.push({date: item['@eventDate'], venue: item.venue['@name'], id: item['@id']});
          });
        }
        else {
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

  clearSongs() {
    this.songs = [];
    this.selected = '';
    this.selectedSong = '';
    this.selectedSongs = [];
  }

  selectSong(songs) {
    songs.forEach((song) => {
      if (song.selected) {
        this.selectedSongs.push(song.label);
      }
    });
  }

  setSongsList(songsList) {
    this.songsList = songsList;
  }

  clearSongsList() {
    return this.songsList = '';
  }

  setValid(valid: boolean) {
    this.valid = valid;
  }

}
