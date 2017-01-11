import { NgModule } from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { routing } from './video-player.routes';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2BootstrapModule } from 'ng2-bootstrap/ng2-bootstrap';
import { KSSwiperModule } from 'angular2-swiper';

import { VideoPlayerComponent } from './video-player.component';
import { VideoTabsComponent } from './video-tabs';
import { VideoSidebarComponent } from './video-sidebar';
import { PlayerComponent } from './player';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    routing,
    NgbModule,
    Ng2BootstrapModule,
    KSSwiperModule
  ],
  exports: [],
  declarations: [
    VideoPlayerComponent,
    VideoTabsComponent,
    VideoSidebarComponent,
    PlayerComponent
  ],
  providers: []
})
export class VideoPlayerModule { }
