import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { PlayerService } from './player.service';

@Component({
  selector: 'player',
  templateUrl: 'player.component.html',
  styleUrls: ['./player.component.scss'],
  providers: [PlayerService]
})
export class PlayerComponent implements OnInit {

  artistName: string;
  playlistId: string;
  showId: string;
  videoId: string;

  ratingOptions: any[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  detailsReoprtOptions: any[] = ['Something Wrong', 'Another Problem'];

  showDetails: any[];
  videoDetails: any[];
  date: string;
  venue: string;
  location: string;
  showVideos: string;

  audio: string;
  video: string;
  views: string;
  time: string;
  songsString: string;
  file: SafeUrl;

  following: boolean = false;
  favourited: boolean = false;

  audioRated: boolean = false;
  audioRating: string;
  videoRated: boolean = false;
  videoRating: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private playerService: PlayerService
  ) { }

  /**
   * Retrieve the artistName, playlistId, showId, and videoId from the route,
   * then call the getShowDetails and getVideoDetails methods.
   */
  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      this.artistName = params['artist'];
      this.playlistId = params['playlist'];
      this.showId = params['show'];
      this.videoId = params['id'];
      this.getShowDetails();
      this.getVideoDetails();
    });
  }

  /**
   * Calls the playerService to get the date, venue, location, and other
   * videos from the show.
   */
  getShowDetails() {
    this.playerService.getShowDetails(this.showId, this.artistName)
    .subscribe(videos => {
      this.date = videos[0].date;
      this.venue = videos[0].venue;
      this.location = videos[0].location;
      this.showVideos = videos[0].videos;
    });
  }

  /**
   * Calls the playerService to get the audio and video ratings, views, time,
   * songs, and file for the selected video.
   */
  getVideoDetails() {
    this.playerService.getVideoDetails(this.playlistId, this.showId, this.videoId, this.artistName)
    .subscribe(videoDetails => {
      this.audio = videoDetails[0].audio;
      this.video = videoDetails[0].video;
      this.views = videoDetails[0].views;
      this.time = videoDetails[0].time;
      this.songsString = videoDetails[0].songsString;
      this.file = this.sanitizer.bypassSecurityTrustResourceUrl(videoDetails[0].file.toString());
    });
  }

  toggleFollow() {
    this.following = !this.following;
  }

  toggleFavourite() {
    this.favourited = !this.favourited;
  }

  rateAudio(rating) {
    this.audioRating = rating;
    this.audioRated = true;
  }

  rateVideo(rating) {
    this.videoRating = rating;
    this.videoRated = true;
  }
}
