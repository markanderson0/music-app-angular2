import { Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder,  FormControl,  FormGroup, Validators} from '@angular/forms';
import { ModalModule, ModalDirective } from 'ng2-bootstrap/components/modal';

@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: ['../account.style.scss'],
  providers: [FormBuilder, ModalModule]
})
export class LoginComponent implements OnInit {

  submitted: boolean = false;
  closeResult: string;

  loginForm:  FormGroup;
  username:  FormControl;
  email:  FormControl;
  password:  FormControl;

  @ViewChild('childModal') public childModal: ModalDirective;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.initForm();
  }

   initForm() {
    this.username = new  FormControl('', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(20)]));
    this.password = new  FormControl('', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(26)]));

    this.loginForm = this.formBuilder.group({
      username: this.username,
      password: this.password
    });
   }

  public showChildModal(): void {
    this.childModal.show();
  }

  public hideChildModal(): void {
    this.childModal.hide();
    this.loginForm.reset();
    this.submitted = false;
  }

  public login(): void {
    this.submitted = true;
    if (this.loginForm.valid) {
      console.log('Valid');
      this.hideChildModal();
    }
    else {
      console.log('Invalid');
    }
  }
}
