import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ArtistShowsService } from './artist-shows.service';

@Component({
  selector: 'artist-shows',
  templateUrl: 'artist-shows.component.html',
  styleUrls: ['./artist-shows.component.scss', '../artist.component.scss'],
  providers: [ArtistShowsService]
})
export class ArtistShowsComponent implements OnInit {

  artistName: string;
  hasShows: boolean;
  pageNum: number = 1;
  maxSize: number = 10;
  currentPage: number = 1;
  totalItems: number;
  itemsPerPage: number;

  artistMBID: string;
  artistShows: any[];
  displayShows: any[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private artistShowsService: ArtistShowsService
  ) { }

  ngOnInit() {
    this.route.parent.params.forEach((params: Params) => {
      this.artistName = params['artist'];
      this.artistShowsService.getName(this.artistName)
      .subscribe(name => {
        this.artistShowsService.getArtist(name.toString())
        .subscribe(artistMBID => {
          if (artistMBID !== undefined) {
            this.artistMBID = artistMBID.toString();
            this.getArtistShows(this.artistMBID);
          }
          else {
            this.hasShows = false;
          }
        });
      });
    });
  }

  getArtistShows(artistMBID) {
    this.artistShows = [];
    this.displayShows = [];
    this.artistShowsService.getArtistShows(artistMBID, this.pageNum)
    .subscribe(shows => {
      this.totalItems = this.artistShowsService.totalPages / 2;
      this.itemsPerPage = this.artistShowsService.itemsPerPage;
      this.artistShows = shows;
      this.displayShows = this.artistShowsService.displayShows;
      this.hasShows = this.artistShowsService.hasShows;
    });
  }

  pageChanged(event: any): void {
    this.pageNum = event.page;
    this.getArtistShows(this.artistMBID);
  }
}
