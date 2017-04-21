import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SearchService } from '../search/search.service';
import { ArtistShowsService } from '../artist/artist-shows/artist-shows.service';

@Component({
  selector: 'video-player',
  templateUrl: 'video-player.component.html',
  styleUrls: ['./video-player.component.scss', '../artist/artist.component.scss'],
  providers: [SearchService, ArtistShowsService]
})
export class VideoPlayerComponent implements OnInit {

  artistName: string;
  bannerPic: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private searchService: SearchService
  ) { }

  /**
   * Retrieve the artistName from the route and call the searchService
   * to get a picture of the artist for displaying as the banner picture.
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
