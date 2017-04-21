import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { MyUploadsService } from './my-uploads.service';

@Component({
  selector: 'my-uploads',
  templateUrl: 'my-uploads.component.html',
  styleUrls: ['../upload.component.scss', '../edit-video-modal/edit-video-modal.component.scss'],
  providers: [MyUploadsService]
})
export class MyUploadsComponent implements OnInit {

  videos: any[];
  example1SwipeOptions: any;
  errorMessage: string;

  songs: any[];
  videoId: string;
  time: string;

  submitted: boolean = false;

  invalidHour: boolean = false;
  invalidMinute: boolean = false;
  invalidSecond: boolean = false;
  noSongSelected: boolean = false;

  hour: number = 0;
  minute: number = 0;
  second: number = 0;
  selectedSong: string = '';

  videoHour: number = 0;
  videoMinute: number = 30;
  videoSecond: number = 29;

  constructor(
    private router: Router,
    private myUploadsService: MyUploadsService,
    public toastr: ToastsManager
    ) {
    this.example1SwipeOptions = myUploadsService.getSwipeOptions();
  }

  /**
   * Call the myUploadsService the get the videos from local storage.
   */
  ngOnInit() {
    this.myUploadsService.getVideos()
      .subscribe(videos => {
        this.videos = videos;
      },
      error => {
        this.errorMessage = <any>error;
      });
  }

  /**
   * Assigns the songs, time and id of the video to variables in the
   * component and the myUploadsService to be displayed in the edit 
   * video modal.
   * 
   * @param songs: list of songs in the video
   * @param time: length of the video
   * @param videoId: id of the video
   */
  editVideoConfig(songs, time, videoId) {
    this.songs = songs;
    this.time = time;
    this.videoId = videoId;
    this.myUploadsService.editVideoConfig(songs, videoId);
  }

  /**
   * Check that a song has been selected.
   */
  checkSong() {
    if (this.selectedSong === '') {
      this.noSongSelected = true;
    } else {
      this.noSongSelected = false;
    }
  }

  /**
   * Check the a valid time chas been entered for a videos cue point.
   */
  checkTime() {
    if (this.hour === undefined || this.hour > this.videoHour) {
      this.invalidHour = true;
    } else {
      this.invalidHour = false;
    }
    if (this.minute === undefined || this.minute > 59 ||
       (this.hour === this.videoHour && this.minute > this.videoMinute)) {
      this.invalidMinute = true;
    } else {
      this.invalidMinute = false;
    }
    if (this.second === undefined || this.second > 59 ||
       (this.minute === this.videoMinute && this.second > this.videoSecond)) {
      this.invalidSecond = true;
    } else {
      this.invalidSecond = false;
    }
  }

  /**
   * Resets the cue point values and shows a message to demonstrate
   * that the video has been deleted.
   */
  confirmDeleteMessage() {
    this.resetValues();
    this.toastr.error('The video has been deleted');
  }

  /**
   * If a song has been selected, shows a message to demonstrate
   * that a cue point has been added and the values are reset for
   * demonstration purposes.
   */
  setCuePoints() {
    this.submitted = true;
    this.checkSong();
    if (!this.noSongSelected) {
      this.confirmCuePointMessage(this.selectedSong);
      this.resetValues();
    }
  }

  /**
   * Show a message to demonstrate that a cue point has been added.
   */
  confirmCuePointMessage(song) {
    this.toastr.success('Cue point has been added to ' + song + '.');
  }

  /**
   * Resets all cue point releated values.
   */
  resetValues() {
    this.hour = 0;
    this.minute = 0;
    this.second = 0;
    this.selectedSong = '';
    this.noSongSelected = false;
    this.invalidHour = false;
    this.invalidMinute = false;
    this.invalidSecond = false;
  }
}
