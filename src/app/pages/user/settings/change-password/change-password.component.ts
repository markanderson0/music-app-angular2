import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'change-password',
  templateUrl: 'change-password.component.html',
  styleUrls: ['../settings.component.scss'],
  providers: [FormBuilder]
})
export class ChangePasswordComponent implements OnInit {

  submitted: boolean = false;
  matching: boolean = false;

  changePasswordForm:  FormGroup;
  oldPassword:  FormControl;
  newPassword:  FormControl;
  confirmPassword: FormControl;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.oldPassword = new  FormControl('', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(26)]));
    this.newPassword = new FormControl('', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(26)]));
    this.confirmPassword = new FormControl('', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(26)]));

    this.changePasswordForm = this.formBuilder.group({
      oldPassword: this.oldPassword,
      newPassword: this.newPassword,
      confirmPassword: this.confirmPassword
    });

    this.newPassword.valueChanges.subscribe(value => {
      this.matchPasswords(this.newPassword, this.confirmPassword);
    });

    this.confirmPassword.valueChanges.subscribe(value => {
      this.matchPasswords(this.newPassword, this.confirmPassword);
    });
  }

  private matchPasswords(newPassword, confirmPassword): void {
    if (newPassword.value === confirmPassword.value) {
      this.matching = true;
    }
    else {
      this.matching = false;
    }
  }

  public submit(): void {
    this.submitted = true;
    if (this.changePasswordForm.valid) {
      console.log('Valid Form');
    }
    else {
      console.log('Invalid Form');
    }
  }
}
