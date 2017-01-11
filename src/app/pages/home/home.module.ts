import { NgModule } from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

import { routing } from './home.routes';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    routing
  ],
  exports: [],
  declarations: [
    HomeComponent,
    ],
  providers: [],
})
export class HomeModule { }
