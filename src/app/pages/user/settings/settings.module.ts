import { NgModule } from '@angular/core';
import { CommonModule }  from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';

import { SettingsComponent }   from './settings.component';
import { ChangePasswordComponent } from './change-password';
import { EditPrivacyComponent } from './edit-privacy';
import { EditProfileComponent } from './edit-profile';
import { EmailNotificationsComponent } from './email-notifications';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2BootstrapModule } from 'ng2-bootstrap/ng2-bootstrap';
import { CustomFormsModule } from 'ng2-validation';
import { FileUploaderModule } from 'ng2-uploader/ng2-uploader';
// import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgbModule,
    Ng2BootstrapModule,
    CustomFormsModule,
    FileUploadModule,
    FileUploaderModule
  ],
  exports: [],
  declarations: [
    SettingsComponent,
    ChangePasswordComponent,
    EditPrivacyComponent,
    EditProfileComponent,
    EmailNotificationsComponent
    // ,
    // FileSelectDirective,
    // FileDropDirective
  ],
  providers: [],
})
export class SettingsModule { }
