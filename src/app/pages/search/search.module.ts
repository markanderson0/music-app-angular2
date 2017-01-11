import { NgModule } from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

import { routing } from './search.routes';
import { SearchComponent } from './search.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    routing
  ],
  exports: [],
  declarations: [SearchComponent],
  providers: []
})
export class SearchModule { }
