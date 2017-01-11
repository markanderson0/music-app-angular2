import { NgModule } from '@angular/core';
import { CommonModule }  from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';

import { ProfileComponent }   from './profile.component';
import { VideosComponent } from './videos';
import { FollowingComponent } from './following';
import { FavouritesComponent } from './favourites';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2BootstrapModule } from 'ng2-bootstrap/ng2-bootstrap';
import { KSSwiperModule } from 'angular2-swiper';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    NgbModule,
    Ng2BootstrapModule,
    KSSwiperModule
  ],
  exports: [],
  declarations: [
    ProfileComponent,
    VideosComponent,
    FollowingComponent,
    FavouritesComponent
  ],
  providers: []
})
export class ProfileModule { }
