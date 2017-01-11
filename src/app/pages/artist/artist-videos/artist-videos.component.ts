import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ArtistVideosService } from './artist-videos.service';

@Component({
  selector: 'artist-videos',
  templateUrl: 'artist-videos.component.html',
  styleUrls: ['../artist.component.scss', './artist-videos.component.scss'],
  providers: [ArtistVideosService]
})
export class ArtistVideosComponent implements OnInit {

  artistName: string;
  shows: any[];
  swipeOptions: any;
  // videoSortOptions = this.artistVideosService.videoSortOptions;
  // videoYears: Array<string> = ['2016', '2015', '2012', '2011', '2008', '2007', '2004', '2003'];
  // videoCountries: Array<string> = ['Austraila', 'Belgium', 'France', 'Germany', 'Italy', 'Ireland', 'Portugal', 'United Kingdom', 'United States'];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private artistVideosService: ArtistVideosService
  ) { }

  ngOnInit() {
    this.route.parent.params.forEach((params: Params) => {
      this.artistName = params['artist'];
      this.swipeOptions = this.artistVideosService.swipeOptions;
      this.artistVideosService.getVideos(this.artistName)
      .subscribe(videos => {
        this.shows = videos;
      });
   });
  }

  openVideo(showId, playlistId, videoId) {
    this.router.navigate(['video/' + this.artistName + '/' + showId + '/' + playlistId + '/' + videoId]);
  }
}
