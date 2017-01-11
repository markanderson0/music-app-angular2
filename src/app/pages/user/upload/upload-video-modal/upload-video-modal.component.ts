import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalModule, ModalDirective } from 'ng2-bootstrap/components/modal';
import { UploadVideoService } from '../upload-video/upload-video.service';
import { ArtistShowsService } from '../../../artist/artist-shows/artist-shows.service';

@Component({
  selector: 'upload-video-modal',
  templateUrl: 'upload-video-modal.component.html',
  styleUrls: ['./upload-video-modal.component.scss'],
  providers: [ModalModule]
})
export class UploadVideoModalComponent implements OnInit {

  submitted: boolean = false;
  terms: boolean = false;

  fileName: string;
  artist: string;
  eventYear: string;
  selectedEvent: string;
  selected: string;

  @ViewChild('uploadVideoModal') public uploadVideoModal: ModalDirective;

  constructor(
    private uploadVideoService: UploadVideoService,
    private artistShowsService: ArtistShowsService
  ) { }

  ngOnInit() {}

  setTerms() {
    this.terms = !this.terms;
  }

  confirmUploadMessage() {

  }

  getUploadData() {
    this.artist = this.artistShowsService.artist;
    this.eventYear = this.uploadVideoService.eventYear;
    this.selectedEvent = this.uploadVideoService.selectedEvent;
    this.selected = this.uploadVideoService.songsList;
  }

  public showUploadVideoModal(): void {
    if (this.uploadVideoService.valid) {
      this.getUploadData();
      this.uploadVideoModal.show();
    }
  }

  public hideUploadVideoModal(): void {
    this.uploadVideoModal.hide();
    this.submitted = false;
  }

  public submitVideo(): void {
    this.submitted = true;
    if (this.terms) {
      console.log('Valid');
      this.hideUploadVideoModal();
    }
    else {
      console.log('Invalid');
    }
  }
}
