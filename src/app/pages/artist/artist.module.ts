import { NgModule } from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2BootstrapModule } from 'ng2-bootstrap/ng2-bootstrap';
import { KSSwiperModule } from 'angular2-swiper';

import { routedComponents, routing } from './artist.routes';

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
  declarations: [routedComponents],
  providers: []
})
export class ArtistModule { }
