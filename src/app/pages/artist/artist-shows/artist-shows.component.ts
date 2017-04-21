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

  /**
   * Retrieve the artists name from the route then call the artistShowsService 
   * to get the artists name according to the Spotify search api, then this 
   * name is used to get the artists MusicBrainz Id (MBID). If the artist has 
   * an MBID then call the getArtistShows method to get the previous shows to 
   * display, otherwise set the hasShows boolean to false since an MBID is 
   * required to get an artists previous shows.
   */
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
          } else {
            this.hasShows = false;
          }
        });
      });
    });
  }

  /**
   * Calls the artistShowsService to get the previous shows, a boolean to indicate
   *  whether the artist has any previous shows, and the total number of pages and
   * number of items to display per page which is set to the paginator.
   * 
   * @param artistMBID: an artists MusicBrainz Id
   */
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

  /**
   * Gets the page number from the page change event and calls the getArtistShows
   * method to get the data regarding the relevant page.
   */
  pageChanged(event: any): void {
    this.pageNum = event.page;
    this.getArtistShows(this.artistMBID);
  }
}
