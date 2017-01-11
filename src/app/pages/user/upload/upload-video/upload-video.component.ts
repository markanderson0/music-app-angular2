import { Component, OnInit, ViewChild, EventEmitter, NgZone } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ArtistShowsService } from '../../../artist/artist-shows/artist-shows.service';
import { UploadVideoService } from './upload-video.service';
import { IDropdownItem, IMultiselectConfig } from 'ng2-dropdown-multiselect';
import { FileUploader } from 'ng2-file-upload';
import { ModalModule, ModalDirective } from 'ng2-bootstrap/components/modal';

@Component({
  selector: 'upload-video',
  templateUrl: 'upload-video.component.html',
  styleUrls: ['../upload.component.scss', '../upload-video-modal/upload-video-modal.component.scss'],
  providers: [FormBuilder, ArtistShowsService, UploadVideoService, ModalModule]
})
export class UploadVideoComponent implements OnInit {

  private uploadEvents: EventEmitter<any> = new EventEmitter();
  private zone: NgZone;
  private basicOptions: Object;
  private progress: number = 0;
  private response: any = {};

  public uploader: FileUploader = new FileUploader({url: ''});
  public hasBaseDropZoneOver: boolean = false;
  public hasAnotherDropZoneOver: boolean = false;

  submitted: boolean = false;
  modalSubmitted: boolean = false;
  terms: boolean = false;

  public dropdownSongs: IDropdownItem[];
  public dropdownConfig: IMultiselectConfig;

  uploadForm:  FormGroup;
  file:  FormControl;
  artist:  FormControl;
  year: FormControl;
  selectedEvent: FormControl;
  selectedSong: FormControl;

  artistName: string;
  songsList: string;
  eventYear: string;
  events: any[];
  eventIndex: number;
  eventDate: string;
  eventVenue: string;
  songs: any[];
  selectedSongs: any[];
  mbid: string;
  selected: string;

  fileName: string = '';
  uploads: any[];
  max: number = 100;
  dynamic: number = 50;
  cancelIndex: number;

  @ViewChild('uploadVideoModal') public uploadVideoModal: ModalDirective;
  @ViewChild('confirmCancelModal') public confirmCancelModal: ModalDirective;

  constructor(
    private formBuilder: FormBuilder,
    private artistShowsService: ArtistShowsService,
    private uploadVideoService: UploadVideoService
  ) { }

  ngOnInit() {
    this.file = new  FormControl('', Validators.required);
    this.artist = new FormControl('', Validators.required);
    this.year = new FormControl('', Validators.required);
    this.selectedEvent = new FormControl('', Validators.required);
    this.selectedSong = new FormControl('', Validators.required);

    this.uploadForm = this.formBuilder.group({
      file: this.file,
      artist: this.artist,
      year: this.year,
      selectedEvent: this.selectedEvent,
      selectedSong: this.selectedSong
    });

    this.dropdownSongs = [];

    this.dropdownConfig = {
      defaultButtonText: 'Select Songs',
      maxInline: 0,
      showCheckAll: false,
      buttonClasses: ['btn', 'btn-default']
    };

    this.artist.valueChanges
    .debounceTime(2000)
    .distinctUntilChanged()
    .subscribe(value => {
      this.artistChange(value);
    });

    this.year.valueChanges
    .debounceTime(500)
    .distinctUntilChanged()
    .subscribe(value => {
      if (value.length === 4) {
        this.getEvent(value);
      }
    });

    this.zone = new NgZone({ enableLongStackTrace: false });
    this.basicOptions = {
      url: '',
      calculateSpeed: true,
      filterExtensions: true,
      allowedExtensions: ['video/mp4', 'video/avi', 'video/mkv', 'image/png', 'mp4'],
      autoUpload: false,
      previewUrl: true
    };


    this.uploads = [];
  }

  artistChange(artistName) {
    this.clearSongs();
    this.artistShowsService.getName(artistName)
    .subscribe(name => {
      this.artistName = name.toString();
      this.artistShowsService.getArtist(name.toString())
      .subscribe(artistMbid => {
        this.mbid = artistMbid.toString();
        if (this.year.value.length === 4) {
          this.getEvent(this.year.value);
        }
      });
    });
  }

  getEvent(eventYear) {
    this.clearSongs();
    if (this.mbid === undefined || this.mbid.length === 0) {
      this.events = [];
    }
    else {
      if (eventYear !== undefined && eventYear.length === 4) {
        this.eventYear = eventYear;
        this.uploadVideoService.getEvent(eventYear, this.mbid)
        .then(events => {
          this.events = events;
        });
      }
    }
  }

  getSongs(event) {
    this.eventDate = this.events.find(even => {
      return even['id'] === event;
    }).date;
    this.eventVenue = this.events.find(even => {
      return even['id'] === event;
    }).venue;
    this.clearSongs();
    if (event !== undefined) {
      this.uploadVideoService.getSongs(event)
      .subscribe(songs => {
        this.dropdownSongs = [];
        songs.forEach((song, index) => {
          this.dropdownSongs.push({id: index + 1, label: song, selected: false});
        });
      });
    }
  }

  selectSong(songs, songsList) {
    this.uploadVideoService.selectSong(songs);
    this.songsList = songsList;
    this.uploadVideoService.setSongsList(songsList);
    this.selectedSong.setValue(songsList);
  }

  clearSongs() {
    this.dropdownSongs = [];
    this.songs = [];
    this.uploadForm.controls['selectedSong'].updateValueAndValidity('');
    this.selectedSongs = [];
    this.selected = '';
    this.songsList = this.uploadVideoService.clearSongsList();
  }

  handleUpload(data: any): void {
    this.zone.run(() => {
      this.response = data;
      this.progress = data.progress.percent / 100;
    });
  }

  getFileName(data: any): void {
    this.fileName = data.name;
    this.file.setValue(this.fileName);
  }

  public showConfirmCancelModal(index): void {
    this.confirmCancelModal.show();
    this.cancelIndex = index;
  }

  public hideConfirmCancelModal(): void {
    this.confirmCancelModal.hide();
  }

  cancelUpload(): void {
    this.uploads.splice(this.cancelIndex, 1);
    this.hideConfirmCancelModal();
  }

  public submit(): void {
    this.submitted = true;
    if (this.uploadForm.valid) {
      this.showUploadVideoModal();
      console.log('Valid Form');
    }
    else {
      console.log('Invalid Form');
    }
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }

  public showUploadVideoModal(): void {
    if (this.uploadVideoService.valid) {
      this.uploadVideoModal.show();
    }
  }

  public hideUploadVideoModal(): void {
    this.uploadVideoModal.hide();
    this.modalSubmitted = false;
    this.terms = false;
  }

  setTerms() {
    this.terms = !this.terms;
  }

  public submitVideo(): void {
    this.modalSubmitted = true;
    if (this.terms) {
      console.log('Valid');
      this.uploads.push({
        'file': this.fileName,
        'artist': this.artistName,
        'date': this.eventDate,
        'venue': this.eventVenue,
        'songsList': this.songsList,
        'progress': this.progress,
        'isCollapsed': false
      });
      this.submitted = false;
      this.uploadForm.reset();
      this.fileName = '';
      this.hideUploadVideoModal();
      // start uploading
      this.uploadEvents.emit('startUpload');
    }
    else {
      console.log('Invalid');
    }
  }
}
