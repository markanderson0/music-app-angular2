import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ArtistAlbumsService } from './artist-albums.service';

@Component({
  selector: 'artist-albums',
  templateUrl: 'artist-albums.component.html',
  styleUrls: ['./artist-albums.component.scss', '../artist.component.scss'],
  providers: [ArtistAlbumsService]
})
export class ArtistAlbumsComponent implements OnInit {

  artistAlbums: any[];
  artistName: string;
  artistPicture: string;
  artistId: string;
  displayAlbums: any[];
  hasAlbums: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private artistAlbumsService: ArtistAlbumsService
  ) { }

  ngOnInit() {
      this.artistAlbums = [];
      this.route.parent.params.forEach((params: Params) => {
        this.artistName = params['artist'];
        this.artistAlbumsService.getArtistPicture(this.artistName)
        .subscribe(picAndId => {
          this.artistPicture = picAndId[0].pic;
          this.artistId = picAndId[0].id;
          this.artistAlbumsService.getArtistAlbums(this.artistId)
          .subscribe(artistAlbums => {
            this.displayAlbums = this.artistAlbumsService.displayAlbums;
            this.hasAlbums = this.artistAlbumsService.hasAlbums;
            this.artistAlbumsService.getAlbumTracks(artistAlbums)
            .subscribe(albumWithTracks => {
              this.artistAlbums = albumWithTracks;
            });
          });
        });
      });
   }
}
