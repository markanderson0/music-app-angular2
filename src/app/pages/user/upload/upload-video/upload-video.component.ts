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
    // If the artist value changes wait 2 secs & call the artistChange method
    this.artist.valueChanges
    .debounceTime(2000)
    .distinctUntilChanged()
    .subscribe(value => {
      this.artistChange(value);
    });
    // If the year value changes wait 1/2 sec & call the getEvent method
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

  /**
   * Calls the artistShowsService to get the name of the artist according to
   * Spotify, then to get the artists MusicBrainz Id via the setlist.fm api.
   * 
   * Any songs have already been selected are cleared when the artists name
   * changes.
   * If a year has already been input then the getEvent method is called to
   * get a list of events.
   * 
   * @param artistName: an artists name
   */
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

  /**
   * Calls the uploadVideoService to get a list of events that the selected
   * artist has played during the selected year.
   * 
   * Any songs have already been selected are cleared when the year changes.
   * If the artists doesnt have an MBID, set the events list to empty and dont
   * search for events.
   * If the year field has 4 numbers entered and the artist has an MBID search
   * for events.
   * 
   * @param eventYear: the year of the event
   */
  getEvent(eventYear) {
    this.clearSongs();
    if (this.mbid === undefined || this.mbid.length === 0) {
      this.events = [];
    } else {
      if (eventYear !== undefined && eventYear.length === 4) {
        this.eventYear = eventYear;
        this.uploadVideoService.getEvent(eventYear, this.mbid)
        .then(events => {
          this.events = events;
        });
      }
    }
  }

  /**
   * Calls the uploadVideoService to get a list of songs for the selected event.
   * 
   * The event date and venue is extracted from the list of events by comparing 
   * the selectedEventId with the event ids in the events list and using the 
   * respective fields.
   * Any songs that had been selected will be removed when a new event is selected.
   * 
   * @param selectedEventId: id of the selected event
   */
  getSongs(selectedEventId) {
    this.eventDate = this.events.find(event => {
      return event['id'] === selectedEventId;
    }).date;
    this.eventVenue = this.events.find(event => {
      return event['id'] === selectedEventId;
    }).venue;
    this.clearSongs();
    if (selectedEventId !== undefined) {
      this.uploadVideoService.getSongs(selectedEventId)
      .subscribe(songs => {
        this.dropdownSongs = [];
        songs.forEach((song, index) => {
          this.dropdownSongs.push({id: index + 1, label: song, selected: false});
        });
      });
    }
  }

  /**
   * Updates the uploadVideoService and songsList to match the changes
   * the user has made about what songs are in the video.
   * 
   * @param songs: songs in the setlist
   * @param songsList: string of the songs that are in the video
   */
  selectSong(songs, songsList) {
    this.uploadVideoService.selectSong(songs);
    this.songsList = songsList;
    this.uploadVideoService.setSongsList(songsList);
    this.selectedSong.setValue(songsList);
  }

  /**
   * Clear all fields with songs.
   */
  clearSongs() {
    this.dropdownSongs = [];
    this.songs = [];
    this.uploadForm.controls['selectedSong'].updateValueAndValidity('');
    this.selectedSongs = [];
    this.selected = '';
    this.songsList = this.uploadVideoService.clearSongsList();
  }

  /**
   * Start uploading.
   */
  handleUpload(data: any): void {
    this.zone.run(() => {
      this.response = data;
      this.progress = data.progress.percent / 100;
    });
  }

  /**
   * Get the name of the selected file.
   */
  getFileName(data: any): void {
    this.fileName = data.name;
    this.file.setValue(this.fileName);
  }

  /**
   * Show the confirm cancellation modal.
   */
  public showConfirmCancelModal(index): void {
    this.confirmCancelModal.show();
    this.cancelIndex = index;
  }

  /**
   * Close the confirm cancellation modal.
   */
  public hideConfirmCancelModal(): void {
    this.confirmCancelModal.hide();
  }

  /**
   * Cancel the upload.
   */
  cancelUpload(): void {
    this.uploads.splice(this.cancelIndex, 1);
    this.hideConfirmCancelModal();
  }

  /**
   * Submit a video to be uploaded and show the confirmation modal.
   */
  public submit(): void {
    this.submitted = true;
    if (this.uploadForm.valid) {
      this.showUploadVideoModal();
      console.log('Valid Form');
    } else {
      console.log('Invalid Form');
    }
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }

  /**
   * Open the confirmation modal.
   */
  public showUploadVideoModal(): void {
    if (this.uploadVideoService.valid) {
      this.uploadVideoModal.show();
    }
  }

  /**
   * Close the confirmation modal.
   */
  public hideUploadVideoModal(): void {
    this.uploadVideoModal.hide();
    this.modalSubmitted = false;
    this.terms = false;
  }

  /**
   * Toggle the terms boolean when the check box is ticked.
   */
  setTerms() {
    this.terms = !this.terms;
  }

  /**
   * Submit the video to be uploaded.
   */
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
    } else {
      console.log('Invalid');
    }
  }
}
