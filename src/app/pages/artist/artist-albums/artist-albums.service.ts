import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ArtistAlbumsService {

  oldArtistId: string = '';
  artistPicture: string = '';
  artistId: string = '';
  picAndId: any[] = [];
  artistAlbums: any[] = [];
  offset: number = 0;
  limit: number = 20;
  albumCover: string = '';
  albumName: string = '';
  albumId: string = '';
  displayAlbums: any[] = [];
  hasAlbums: boolean;

  constructor(private http: Http) { }

  /**
   * Gets an artists id from the Spotify search api.
   * 
   * @param name: an artists name
   * @return an artists id
   */
  getArtistId(name: string): Observable<string> {
    let params = new URLSearchParams();
    params.set('q', name);
    params.set('type', 'artist');
    params.set('limit', '1');
    return this.http.get('https://api.spotify.com/v1/search', { search: params })
    .map((response: Response) => {
      this.artistId = response.json().artists.items[0].id;
      return this.artistId;
    });
  }

  /**
   * Gets a list containing album name, id and cover
   * from the Spotify artists api.
   * 
   * @param newArtistId: an artists id
   * @return a list containing album name, id and picture
   */
  getArtistAlbums(newArtistId: string): Observable<any[]> {
    if (newArtistId !== this.oldArtistId) {
      this.oldArtistId = newArtistId;
      this.albumCover = '';
      this.albumName = '';
      this.albumId = '';
      this.artistAlbums = [];
      this.offset = 0;
    }
    let params = new URLSearchParams();
    params.set('album_type', 'album');
    return this.http.get('https://api.spotify.com/v1/artists/' + newArtistId + '/albums', { search: params })
    .map((response: Response) => {
      response.json().items.map(album => {
        this.albumName = album.name;
        this.albumId = album.id;
        this.albumCover = this.getAlbumCover(album);
        if (!this.in_array(this.artistAlbums, this.albumName)) {
          this.artistAlbums.push({id: this.albumId, name: this.albumName, year: '', pic: this.albumCover});
        }
      });
      this.getDisplayAlbums(this.artistAlbums);
      return this.artistAlbums;
    });
  }

  /**
   * Gets a list containing an albums name, cover, release year and songs
   * from the Spotify albums api.
   * 
   * @param albums: list containing album name, id and picture
   * @return a list containing an albums name, cover, release year and songs
   */
  getAlbumTracks(albums): Observable<any[]> {
    let albumSongs = [];
    let albumWithSongs = [];
    let releaseYear = '';
    let albumCover = '';
    let albumIds = this.getAlbumIds(albums);
    let params = new URLSearchParams();
    params.set('ids', albumIds);
    return this.http.get('https://api.spotify.com/v1/albums/', { search: params })
    .map((response: Response) => {
      response.json().albums.map(album => {
        albumSongs = [];
        albumCover = this.getAlbumCover(album);
        album.tracks.items.map(track => {
          albumSongs.push({trackNum: track.track_number, name: track.name});
        });
        releaseYear = album.release_date.slice(0, 4);
        albumWithSongs.push({name: album.name, cover: albumCover, year: releaseYear, songs: albumSongs});
      });
      return albumWithSongs;
    });
  }

  /**
   * Takes the response from the Spotify albums api returns an image
   * from the response if there is one available, otherwise a default
   * image is used.
   * 
   * @param album: response from the Spotify albums api
   * @return the albums cover image
   */
  getAlbumCover(album) {
    if (album.images.length > 1) {
      return album.images[1].url;
    } else if (album.images.length === 1) {
      return album.images[0].url;
    } else {
      return '/img/transblue-bg.jpg';
    }
  }

  /**
   * Method to extract the album ids from the albums list and append
   * each album id to a comma seperated string containing the album ids
   * that is required of the Spotify albums api. The Spotify albums api
   * only allows for 20 albums to be searched at a time so if an artist
   * has more than 20 albums, only the latest 20 are used.
   * 
   * @param albums: list containing album name, id and picture
   * @return String containing album ids seperated by commas
   */
  getAlbumIds(albums) {
    let albumIds = '';
      if (albums.length <= 20) {
        for (let i = 0; i < albums.length; i++) {
          albumIds += albums[i].id + ',';
        }
        albumIds = albumIds.slice(0, -1);
      }
      return albumIds;
  }

  /**
   * Assigns variables for displaying albums on the artists profile page.
   * 
   * If the artist has more than 3 albums only display the most recent 3
   * and if the artist has no albums set the hasAlbums boolean to false to 
   * display that the artist has no albums.
   * 
   * @param artistAlbums: list of an artists albums
   */
  getDisplayAlbums(artistAlbums) {
    if (artistAlbums !== undefined) {
      if (artistAlbums.length !== 0) {
        if (artistAlbums.length > 3) {
           this.displayAlbums = artistAlbums.slice(0, 3);
        } else {
           this.displayAlbums = artistAlbums;
        }
         this.hasAlbums = true;
      } else {
         this.hasAlbums = false;
      }
    } else {
       this.hasAlbums = false;
    }
  }

  in_array(array, name) {
    for (let i = 0; i < array.length; i++) {
        if (array[i].name === name) {
          return true;
        }
    }
    return false;
  }

}
