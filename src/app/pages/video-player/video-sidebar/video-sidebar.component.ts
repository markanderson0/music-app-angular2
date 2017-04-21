import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { VideoSidebarService } from './video-sidebar.service';

@Component({
  selector: 'video-sidebar',
  templateUrl: 'video-sidebar.component.html',
  styleUrls: ['./video-sidebar.component.scss'],
  providers: [VideoSidebarService]
})
export class VideoSidebarComponent implements OnInit {

  artistName: string;
  playlistId: string;
  showId: string;
  videoId: string;
  playlistDetails: any[];
  setlist: any[];
  date: string;
  venue: string;
  location: string;

  loadedVideos: boolean = false;
  loadedSetlist: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private videoSidebarService: VideoSidebarService
  ) { }

  /**
   * Retrieve the artistName, playlistId, showId, and videoId from the route then
   * call the getShowVideos method.
   */
  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      this.artistName = params['artist'];
      this.playlistId = params['playlist'];
      this.showId = params['show'];
      this.videoId = params['id'];
      this.getShowVideos();
    });
   }

  /**
   * Calls the videoSidebarService to get the date, venue, and location of the video.
   */
  getShowVideos() {
      this.loadedVideos = true;
      this.videoSidebarService.getVideos(this.playlistId, this.showId, this.artistName)
      .subscribe(playlistDetails => {
        this.playlistDetails = playlistDetails;
        this.date = playlistDetails[0]['date'];
        this.venue = playlistDetails[0]['venue'];
        this.location = playlistDetails[0]['location'];
      });
  }

  /**
   * Calls the videoSidebarService to get the setlist for the show that the video is
   * a part of.
   */
  getSetlist() {
    if (!this.loadedSetlist) {
      this.loadedSetlist = true;
      this.videoSidebarService.getSetlist(this.artistName, this.date, this.venue, this.location)
      .subscribe(setlist => {
        this.setlist = setlist;
      });
    }
  }

  openVideo(videoId) {
    this.router.navigate(['video', this.artistName, this.showId, this.playlistId, videoId]);
  }
}
