import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VideosService } from './videos.service';

@Component({
  selector: 'videos',
  templateUrl: 'videos.component.html',
  styleUrls: ['../profile.component.scss'],
  providers: [VideosService]
})
export class VideosComponent implements OnInit {

  videos: any[];
  errorMessage: string;
  example1SwipeOptions: any;
  sort: Array<string>;
  isCollapsed: boolean = false;

  constructor(private router: Router, private videosService: VideosService) {
    this.example1SwipeOptions = videosService.getSwipeOptions();
    // this.sort = ['0-9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
    //               'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
   }

  ngOnInit() {
    this.getVideos();
  }

  /**
   * Call the videosService the get the videos from local storage.
   */
  getVideos() {
    this.videosService.getVideos()
    .subscribe(videos => {
      this.videos = videos;
    },
    error => {
      this.errorMessage = <any>error;
    });
  }

  openVideo(name: string, show: string, playlist: string, video: string) {
    this.router.navigate(['/video/' + name + '/' + show + '/' + playlist + '/' + video]);
  }
}
