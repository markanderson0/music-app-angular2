import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SearchService } from '../search/search.service';

@Component({
  selector: 'artist',
  templateUrl: 'artist.component.html',
  styleUrls: ['./artist.component.scss'],
  providers: [SearchService]
})
export class ArtistComponent implements OnInit {

  artistName: string;
  bannerPic: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private searchService: SearchService
  ) { }

  /**
   * Retrieve the artists name from the route parameter then use 
   * the search service to get the artist picture to display as 
   * the banner picture.
   */
  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      this.artistName = params['artist'];
      this.searchService.searchArtists(this.artistName, '1')
      .subscribe(results => {
        this.bannerPic = results[0].image;
      });
    });
   }

   openArtistProfile() {
     this.router.navigate(['artist/' + this.artistName + '/profile']);
   }
}
