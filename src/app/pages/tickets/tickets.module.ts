import { NgModule } from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { AgmCoreModule, provideLazyMapsAPILoaderConfig } from 'angular2-google-maps/core';

import { routedComponents, routing } from './tickets.routes';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    routing,
    AgmCoreModule.forRoot()
  ],
  exports: [],
  declarations: [routedComponents],
  providers: [provideLazyMapsAPILoaderConfig({apiKey: 'AIzaSyAIVBg8OCGVmtDBOlUADbU6ppeTX8bPagE'})],
})
export class TicketsModule { }
