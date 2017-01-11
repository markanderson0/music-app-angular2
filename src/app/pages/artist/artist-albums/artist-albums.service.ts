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

  getArtistPicture(name: string): Observable<any[]> {
    this.picAndId = [];
    let params = new URLSearchParams();
    params.set('q', name);
    params.set('type', 'artist');
    params.set('limit', '1');
    return this.http.get('https://api.spotify.com/v1/search', { search: params })
    .map((response: Response) => {
      if (response.json().artists.items[0].images.length > 1) {
        this.artistPicture = response.json().artists.items[0].images[1].url;
      }
      else if (response.json().artists.items[0].images.length === 1) {
        this.artistPicture = response.json().artists.items[0].images[0].url;
      }
      else {
        this.artistPicture = 'assets/img/transblue-bg.jpg';
      }
      this.artistId = response.json().artists.items[0].id;
      this.picAndId.push({pic: this.artistPicture, id: this.artistId});
      return this.picAndId;
    });
  }

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
          this.artistAlbums.push({id: this.albumId, name: this.albumName, year: '', pic: this.albumCover, songs: []});
        }
      });
      this.getDisplayAlbums(this.artistAlbums);
      return this.artistAlbums;
    });
  }

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

  getAlbumCover(album) {
    if (album.images.length > 1) {
      return album.images[1].url;
    }
    else if (album.images.length === 1) {
      return album.images[0].url;
    }
    else {
      return '/img/transblue-bg.jpg';
    }
  }

  getAlbumIds(albums) {
    let albumIds = '';
    if (albums.length !== 0) {
      if (albums.length <= 20) {
        for (let i = 0; i < albums.length; i++) {
          albumIds += albums[i].id + ',';
        }
        albumIds = albumIds.slice(0, -1);
      }
      return albumIds;
    }
    else {
      return albumIds;
    }
  }

  addAlbumTracks(albums, albumWithSongs) {
    for (let j = 0; j < albums.length; j++) {
      albums[j].songs = albumWithSongs[j].songs;
      albums[j].year = albumWithSongs[j].year;
    }
    return albums;
  }

  getDisplayAlbums(artistAlbums) {
    if (artistAlbums !== undefined) {
      if (artistAlbums.length !== 0) {
        if (artistAlbums.length > 3) {
           this.displayAlbums = artistAlbums.slice(0, 3);
        }
        else {
           this.displayAlbums = artistAlbums;
        }
         this.hasAlbums = true;
      }
      else {
         this.hasAlbums = false;
      }
    }
    else {
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
