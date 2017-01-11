import { NgModule } from '@angular/core';
import { CommonModule }  from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';

import { UploadComponent }   from './upload.component';
import { UploadVideoComponent } from './upload-video';
import { UploadVideoModalComponent } from './upload-video-modal';
import { MyUploadsComponent } from './my-uploads';
import { EditVideoModalComponent } from './edit-video-modal';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2BootstrapModule } from 'ng2-bootstrap/ng2-bootstrap';
import { KSSwiperModule } from 'angular2-swiper';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { FileUploaderModule } from 'ng2-uploader/ng2-uploader';
// import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { DropdownMultiselectModule } from 'ng2-dropdown-multiselect';
import { Elastic } from 'angular2-elastic';
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgbModule,
    Ng2BootstrapModule,
    KSSwiperModule,
    ToastModule,
    DropdownMultiselectModule,
    Elastic,
    FileUploadModule
    ,
    FileUploaderModule
  ],
  exports: [],
  declarations: [
    UploadComponent,
    UploadVideoComponent,
    UploadVideoModalComponent,
    MyUploadsComponent,
    EditVideoModalComponent
    // ,
    // FileSelectDirective,
    // FileDropDirective
  ],
  providers: []
})
export class UploadModule { }
