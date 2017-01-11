import { NgModule } from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

import { routing } from './user.routes';
import { UserComponent } from './user.component';
import { ProfileModule } from './profile/profile.module';
import { FollowingModule } from './following/following.module';
import { UploadModule } from './upload/upload.module';
import { SettingsModule } from './settings/settings.module';
// import { FileUploader } from 'ng2-file-upload';
// import { UPLOAD_DIRECTIVES } from 'ng2-uploader/ng2-uploader';
// import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { Ng2BootstrapModule } from 'ng2-bootstrap/ng2-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    routing,
    ProfileModule,
    FollowingModule,
    UploadModule,
    SettingsModule,
    Ng2BootstrapModule
  ],
  exports: [],
  declarations: [
    UserComponent
    //     ,
    // FileSelectDirective,
    // FileDropDirective
    // ,
    // UPLOAD_DIRECTIVES
  ],
  providers: [],
})
export class UserModule { }
