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
    private myUpladsService: MyUploadsService,
    public toastr: ToastsManager
    ) {
    this.example1SwipeOptions = myUpladsService.getSwipeOptions();
  }

  ngOnInit() {
    this.myUpladsService.getVideos()
      .subscribe(videos => {
        this.videos = videos;
      },
      error => {
        this.errorMessage = <any>error;
      });
  }

  editVideoConfig(songs, time, videoId) {
    this.songs = songs;
    this.time = time;
    this.videoId = videoId;
    this.myUpladsService.editVideoConfig(songs, videoId);
  }

  checkSong() {
    if (this.selectedSong === '') {
      this.noSongSelected = true;
    }
    else {
      this.noSongSelected = false;
    }
  }

  checkTime() {
    if (this.hour === undefined || this.hour > this.videoHour) {
      this.invalidHour = true;
    }
    else {
      this.invalidHour = false;
    }
    if (this.minute === undefined || this.minute > 59 ||
       (this.hour === this.videoHour && this.minute > this.videoMinute)) {
      this.invalidMinute = true;
    }
    else {
      this.invalidMinute = false;
    }
    if (this.second === undefined || this.second > 59 ||
       (this.minute === this.videoMinute && this.second > this.videoSecond)) {
      this.invalidSecond = true;
    }
    else {
      this.invalidSecond = false;
    }
  }

  confirmDeleteMessage() {
    this.resetValues();
    this.toastr.error('The video has been deleted');
  }

  setCuePoints() {
    this.submitted = true;
    this.checkSong();
    if (!this.noSongSelected) {
      this.confirmCuePointMessage(this.selectedSong);
      this.resetValues();
    }
  }

  confirmCuePointMessage(song) {
    this.toastr.success('Cue point has been added to ' + song + '.');
  }

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
