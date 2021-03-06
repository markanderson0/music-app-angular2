import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BrowseGenreService } from './browse-genre.service';

@Component({
  selector: 'browse-genre',
  templateUrl: 'browse-genre.component.html',
  styleUrls: ['../browse.component.scss'],
  providers: [BrowseGenreService]
})
export class BrowseGenreComponent implements OnInit {

  genre: string;
  artists: any[];
  loadMoreArtists: boolean = true;

  constructor(
  private router: Router,
  private route: ActivatedRoute,
  private browseGenreService: BrowseGenreService
  ) { }

  /**
   * Retrieve the genre from the route then call the browseGenreService to get
   * the artists associated with the genre.
   */
  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      this.genre = params['genre'];
      this.browseGenreService.getGenrePlaylist(this.genre).subscribe(artists => {
        this.artists = artists;
      });
    });
  }

  /**
   * Load more artists from the selected genre from the browseGenreService.
   */
  getMoreArtists(val) {
    this.browseGenreService.getGenrePlaylist(this.genre).subscribe(artists => {
      this.loadMoreArtists = this.browseGenreService.loadMoreArtists;
      this.artists = this.artists.concat(artists);
    });
  }

  openBrowseHome(genre: string) {
    this.router.navigate(['browse']);
  }

  openArtistProfile(name: string) {
    this.router.navigate(['/artist/' + name + '/profile']);
  }
}
