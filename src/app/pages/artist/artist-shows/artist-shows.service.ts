import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ArtistShowsService {

  artists: any[];
  image: string;
  artist: string;

  shows: any[] = [];
  song: string = '';
  correctName: boolean = false;
  mbid: string = '';
  totalPages: number;
  itemsPerPage: number;
  hasShows: boolean;
  displayShows: any[];

  constructor(private http: Http) { }

  /**
   * Searches for an artist through the Spotify search api and returns the name
   * of the first artist.
   * 
   * @param name: an artists name
   * @return an artists name according to the Spotify search api
   */
  getName(name: string): Observable<any[]> {
    let params = new URLSearchParams();
    params.set('q', name);
    params.set('type', 'artist');
    params.set('limit', '1');
    return this.http.get('https://api.spotify.com/v1/search', { search: params })
    .map((response: Response) => {
      this.artist = response.json().artists.items[0].name;
      return response.json().artists.items[0].name;
    }, errorCallback => {
      return;
    });
  }

  /**
   * Searches the setlist.fm api to get an artists MusicBrainz Id.
   * 
   * If the response returns an array call the getMBID method to check if any of the
   * returned artists names match the required artist and if so return the MBID,
   * otherwise check if the single result matches the required artist and return
   * the MBID directly.
   * 
   * @param name: an artists name
   * @returns an artists MusicBrainz Id
   */
  getArtist(name: string): Observable<any[]> {
    let params = new URLSearchParams();
    params.set('artistName', name);
    params.set('p', '1');
    return this.http.get('http://api.setlist.fm/rest/0.1/search/setlists.json', { search: params })
    .map((response: Response) => {
      if (response.json().setlists.setlist instanceof Array) {
        return this.getMBID(response.json().setlists.setlist, name);
      } else {
        if (response.json().setlists.setlist.artist['@name'].toLowerCase() === name.toLowerCase() ||
          response.json().setlists.setlist.artist['@sortName'].toLowerCase() === name.toLowerCase()) {
          return response.json().setlists.setlist.artist['@mbid'];
        }
      }
    }, errorCallback => {
      return;
    });
  }

  /**
   * Returns an artists MusicBrainz Id if the artists name in any of the
   * setlists matches that of the required artist.
   * 
   * @param setlists: list containing details about an artists setlist
   * @param name: an artists name
   * @return an artists MusicBrainz Id
   */
  getMBID(setlists: any[], name: string) {
    for (let i = 0; i < setlists.length; i++) {
      if (setlists[i].artist['@name'].toLowerCase() === name.toLowerCase() ||
        setlists[i].artist['@sortName'].toLowerCase() === name.toLowerCase()) {
        return setlists[i].artist['@mbid'];
      }
    }
  }

  /**
   * Returns a list containg details about an artists show including the
   * name of the tour, show id, date, venue, country, city, state, latitude,
   * longitude, songs played, and if the table have been collapsed.
   * 
   * Parses the response from the setlist.fm api and assigns the values to be
   * placed in the shows list accordingly.
   * 
   * @param mbid: an artists MusicBrainz Id
   * @param pageNum: a page number
   * @return a list containing details about an artists show
   */
  getArtistShows(mbid, pageNum): Observable<any[]> {
    this.shows = [];
    let venue = '';
    let country = '';
    let city = '';
    let state = '';
    let latitude = '';
    let longitude = '';
    let params = new URLSearchParams();
    params.set('artistMbid', mbid);
    params.set('p', pageNum);
    return this.http.get('http://api.setlist.fm/rest/0.1/search/setlists.json', { search: params })
    .map((response: Response) => {
      this.totalPages = parseInt(response.json().setlists['@total'], 0);
      this.itemsPerPage = parseInt(response.json().setlists['@itemsPerPage'], 0);
      response.json().setlists.setlist.map(setlist => {
        let id = setlist['@id'];
        if (!this.in_array(this.shows, id)) {
          let tour = setlist['@tour'];
          let date =  setlist['@eventDate'];

          if (setlist.hasOwnProperty('venue')) {
            venue = setlist.venue['@name'];
            city = setlist.venue.city['@name'];

            if (setlist.venue.city.hasOwnProperty('country')) {
              country = setlist.venue.city.country['@name'];
            }
            if (country === 'United States' && setlist.venue.city.hasOwnProperty('@stateCode')) {
              state = setlist.venue.city['@stateCode'];
            } else {
              state = '';
            }
            if (setlist.venue.city.hasOwnProperty('coords')) {
              latitude = setlist.venue.city.coords['@lat'];
              longitude = setlist.venue.city.coords['@long'];
            }
          }
          let songsSetlist = this.getSetlist(setlist.sets);

          this.shows.push({tour: tour, id: id, date: date, venue: venue,
            country: country, city: city, state: state, latitude: latitude,
            longitude: longitude, songs: songsSetlist, isCollapsed: false});
        }
      });
      this.availableShows(this.shows);
      return this.shows;
    }, errorCallback => {
      this.shows = [];
      this.availableShows(this.shows);
      return this.shows;
    });
  }

  /**
   * Returns a list of songs by parsing through the resonse from the setlist.fm api.
   * 
   * If the set property is an array i.e. there are multiple sets (encores) then each
   * set must be parsed individually, then if there are multiple songs in the set making
   * the songs property an array, each song must be parsed to get its name and then it
   * must be added to the songs list.
   * 
   * If the set property isnt an array and the songs property is i.e. a set with multiple
   * songs an no encore, then each song must be parsed to get its name and then it must 
   * be added to the songs list.
   * 
   * If the set property and the songs property arent lists i.e. a single song set, then
   * the individual song must be parsed and added to the songs list.
   * 
   * @param setlist: a list containing details about a setlist
   * @return a list of songs
   */
  getSetlist(setlist) {
    let songs = [];
    if (setlist.hasOwnProperty('set')) {
      // If setlist has an encore
      if (setlist.set instanceof Array) {
        setlist.set.map(setSongs => {
          if (setSongs.song instanceof Array) {
            setSongs.song.map(setSong => {
              if (!setSong.hasOwnProperty('@tape')) {
                if (setSong.hasOwnProperty('cover')) {
                  this.song = setSong['@name'] + ' (' + setSong.cover['@name'] + ' cover)';
                } else {
                  this.song = setSong['@name'];
                }
                songs.push(this.song);
              }
            });
          } else {
            songs.push(setSongs.song['@name']);
          }
        });
      }
      // If setlist doesnt have an encore
      else if (setlist.set.song instanceof Array) {
        setlist.set.song.map(setSong => {
          if (!setSong.hasOwnProperty('@tape')) {
            if (setSong.hasOwnProperty('cover')) {
              this.song = setSong['@name'] + ' (' + setSong.cover['@name'] + ' cover)';
            } else {
              this.song = setSong['@name'];
            }
            songs.push(this.song);
          }
        });
      }
      // If a single song set
      else {
        if (!setlist.set.song.hasOwnProperty('@tape')) {
          if (setlist.set.song.hasOwnProperty('cover')) {
            this.song = setlist.set.song['@name'] + ' (' + setlist.set.song.cover['@name'] + ' cover)';
          } else {
            this.song = setlist.set.song['@name'];
          }
          songs.push(this.song);
        }
      }
    }
    return songs;
  }

  /**
   * Assigns variables for displaying shows on the artists profile page.
   * 
   * If the artist has more than 4 shows only display the most recent 4
   * and if the artist has no shows set the hasShows boolean to false to 
   * display that the artist has no shows available.
   * 
   * @param shows: list of shows
   */
  availableShows(shows) {
    this.displayShows = [];
    if (shows !== undefined) {
      if (shows.length !== 0) {
        this.hasShows = true;
        if (shows.length > 4) {
          this.displayShows = shows.slice(0, 4);
        } else {
          this.displayShows = shows;
        }
      } else {
        this.hasShows = false;
      }
    } else {
      this.hasShows = false;
    }
  }

  in_array(array, id) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].id === id) {
        return true;
      }
    }
    return false;
  }

}
