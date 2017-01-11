import { NgModule } from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

import { routedComponents, routing } from './browse.routes';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    routing
  ],
  exports: [],
  declarations: [routedComponents],
  providers: []
})
export class BrowseModule { }
