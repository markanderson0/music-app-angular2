import { Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { ModalModule, ModalDirective } from 'ng2-bootstrap/components/modal';
import { CustomValidators } from 'ng2-validation';
import * as moment from 'moment';

@Component({
  selector: 'signup',
  templateUrl: 'signup.component.html',
  styleUrls: ['../account.style.scss'],
  providers: [FormBuilder, ModalModule]
})
export class SignupComponent implements OnInit {

  submitted: boolean = false;
  validDOB: boolean = false;

  signupForm:  FormGroup;
  username:  FormControl;
  email:  FormControl;
  password:  FormControl;
  dob:  FormGroup;
  day: FormControl;
  month: FormControl;
  year: FormControl;
  gender:  FormControl;
  terms:  FormControl;

  @ViewChild('childModal') public childModal: ModalDirective;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.username = new  FormControl('', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(20)]));
    this.email = new  FormControl('', Validators.compose([Validators.required, CustomValidators.email]));
    this.password = new  FormControl('', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(26)]));
    this.day = new FormControl('', Validators.compose([Validators.required, CustomValidators.min(1), CustomValidators.max(31)]));
    this.month = new FormControl('', Validators.compose([Validators.required, CustomValidators.min(1), CustomValidators.max(12)]));
    this.year = new FormControl('', Validators.compose([Validators.required, CustomValidators.min(1900), CustomValidators.max(2015)]));
    this.gender = new  FormControl('', Validators.compose([Validators.required]));
    this.terms = new  FormControl('', Validators.compose([Validators.required]));

    this.signupForm = this.formBuilder.group({
      username: this.username,
      email: this.email,
      password: this.password,
      dob: this.formBuilder.group({
        day: this.day,
        month: this.month,
        year: this.year
      }),
      gender: this.gender,
      terms: this.terms
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

  public showChildModal(): void {
    this.childModal.show();
  }

  public hideChildModal(): void {
    this.childModal.hide();
    this.gender.patchValue('');
    this.signupForm.reset();
    this.submitted = false;
  }

  public signup(): void {
    this.submitted = true;
    if (this.signupForm.valid && this.validDOB && this.terms.value) {
      console.log('Valid');
      this.hideChildModal();
    }
    else {
      console.log('Invalid');
    }
  }
}
