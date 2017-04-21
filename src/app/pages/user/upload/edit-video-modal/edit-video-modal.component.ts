import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalModule, ModalDirective } from 'ng2-bootstrap/components/modal';
import { MyUploadsService } from '../my-uploads/my-uploads.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'edit-video-modal',
  templateUrl: 'edit-video-modal.component.html',
  styleUrls: ['./edit-video-modal.component.scss'],
  providers: [ModalModule]
})
export class EditVideoModalComponent implements OnInit {

  submitted: boolean = false;
  terms: boolean = false;
  artist: string;
  eventYear: string;
  selectedEvent: string;
  selected: string;

  songs: any[];
  videoId: string;

  invalidHour: boolean = false;
  invalidMinute: boolean = false;
  invalidSecond: boolean = false;
  noSongSelected: boolean = false;

  hour: number = 0;
  minute: number = 0;
  second: number = 0;
  selectedSong: string = '';

  @ViewChild('editVideoModal') public uploadVideoModal: ModalDirective;

  constructor(
    private modalService: NgbModal,
    private myUploadsService: MyUploadsService
  ) { }

  ngOnInit() {
    console.log('modal');
    this.songs = this.myUploadsService.songs;
    this.videoId = this.myUploadsService.videoId;
  }

  public showEditVideoModal(): void {
    this.uploadVideoModal.show();
  }

  public hideEditVideoModal(): void {
    this.uploadVideoModal.hide();
    this.submitted = false;
  }

  checkSong() {
    if (this.selectedSong === '') {
      this.noSongSelected = true;
    } else {
      this.noSongSelected = false;
    }
  }

  checkTime() {
    if (this.hour === undefined) {
      this.invalidHour = true;
    } else {
      this.invalidHour = false;
    }
    if (this.minute === undefined) {
      this.invalidMinute = true;
    } else {
      this.invalidMinute = false;
    }
    if (this.second === undefined) {
      this.invalidSecond = true;
    } else {
      this.invalidSecond = false;
    }
  }

  confirmDeleteMessage() {
    this.resetValues();
  }

  setCuePoints() {
    this.submitted = true;
    this.checkSong();
    if (!this.noSongSelected) {
      this.confirmCuePointMessage(this.selectedSong);
      this.resetValues();
      this.hideEditVideoModal();
    }
  }

  confirmCuePointMessage(song) {

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
