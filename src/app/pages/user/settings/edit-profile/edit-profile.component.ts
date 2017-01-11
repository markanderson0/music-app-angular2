import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { FileUploader } from 'ng2-file-upload';
import * as moment from 'moment';

@Component({
  selector: 'edit-profile',
  templateUrl: 'edit-profile.component.html',
  styleUrls: ['../settings.component.scss'],
  providers: [FormBuilder]
})
export class EditProfileComponent implements OnInit {

  submitted: boolean = false;
  validDOB: boolean = false;

  noProfilePicture: boolean = false;
  noBannerPicture: boolean = false;

  editProfileForm:  FormGroup;
  email:  FormControl;
  dob:  FormGroup;
  day: FormControl;
  month: FormControl;
  year: FormControl;

  private zone: NgZone;
  private basicOptions: Object;
  private progress: number = 0;
  private response: any = {};

  public uploader: FileUploader = new FileUploader({url: ''});
  public hasBaseDropZoneOver: boolean = false;
  public hasAnotherDropZoneOver: boolean = false;

  picture: string = '';
  profilePicture = '/img/angular.png';
  bannerPicture = '/img/typo01.png';

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.email = new  FormControl('', Validators.compose([Validators.required, CustomValidators.email]));
    this.day = new FormControl('', Validators.compose([Validators.required, CustomValidators.min(1), CustomValidators.max(31)]));
    this.month = new FormControl('', Validators.compose([Validators.required, CustomValidators.min(1), CustomValidators.max(12)]));
    this.year = new FormControl('', Validators.compose([Validators.required, CustomValidators.min(1900), CustomValidators.max(2015)]));

    this.editProfileForm = this.formBuilder.group({
      email: this.email,
      dob: this.formBuilder.group({
        day: this.day,
        month: this.month,
        year: this.year
      })
    });

    this.day.valueChanges.subscribe(value => {
      this.checkDate(this.day, this.month, this.year);
    });

    this.month.valueChanges.subscribe(value => {
      this.checkDate(this.day, this.month, this.year);
    });

    this.year.valueChanges.subscribe(value => {
      this.checkDate(this.day, this.month, this.year);
    });

    this.zone = new NgZone({ enableLongStackTrace: false });
    this.basicOptions = {
      url: '',
      calculateSpeed: true,
      filterExtensions: true,
      allowedExtensions: ['image/png', 'image/jpg', 'image/jpeg'],
      autoUpload: false,
      previewUrl: true
    };
  }

  private checkDate(day: any, month: any, year: any) {
    if (day.value > 0 && day.value < 10) {
      day = '0' + day.value.toString();
    }
    else {
      day = day.value;
    }
    if (month.value > 0 && month.value < 10) {
      month = '0' + month.value.toString();
    }
    else {
      month = month.value;
    }
    let date = year.value + '-' + month + '-' + day;
    if (moment(date, 'YYYY-MM-DD', true).isValid()) {
      this.validDOB = true;
      console.log('Valid Date');
    }
    else {
      this.validDOB = false;
      console.log('Invalid Date');
    }
  }

  public removePicture(pic): void {
    if (pic === 'profile') {
      this.profilePicture = 'img/no-photo.png';
      this.noProfilePicture = true;
    }
    else if (pic === 'banner') {
      this.bannerPicture = 'img/no-photo.png';
      this.noBannerPicture = true;
    }
  }

  public uploadPicture(): void {
    let fileInput = document.getElementById('uploadFile');
    fileInput.click();
  }

  handleUpload(data: any): void {
    this.zone.run(() => {
      this.response = data;
      this.progress = data.progress.percent / 100;
    });
  }

  handlePreviewData(data: any): void {
    if (this.picture === 'profile') {
      this.profilePicture = data.data;
      this.noProfilePicture = false;
    }
    else if (this.picture === 'banner') {
      this.bannerPicture = data.data;
      this.noBannerPicture = false;
    }
  }

  setPictureType(type: string) {
    this.picture = type;
  }

  handleBannerPreviewData(data: any): void {
    this.bannerPicture = data.data;
  }

  public submit(): void {
    this.submitted = true;
    if (this.editProfileForm.valid && this.validDOB) {
      console.log('Valid Form');
    }
    else {
      console.log('Invalid Form');
    }
  }
}
