import { NgModule } from '@angular/core';
import { CommonModule }  from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';

import { FollowingComponent }   from './following.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [],
  declarations: [FollowingComponent],
  providers: [],
})
export class FollowingModule { }
