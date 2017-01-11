import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2BootstrapModule } from 'ng2-bootstrap/ng2-bootstrap';
import { CustomFormsModule } from 'ng2-validation';

import { LoginComponent }   from './account';
import { SignupComponent }   from './account';
import { MainSidebarComponent } from './main-sidebar';
import { MainSidebarExpandedComponent } from './main-sidebar';
import { MainSidebarCollapsedComponent } from './main-sidebar';
import { PanelComponent } from './panel';
import { RightSidebarComponent } from './right-sidebar';

const COMPONENTS = [
  LoginComponent,
  SignupComponent,
  MainSidebarComponent,
  MainSidebarExpandedComponent,
  MainSidebarCollapsedComponent,
  PanelComponent,
  RightSidebarComponent
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    Ng2BootstrapModule,
    CustomFormsModule
  ],
  exports: [
    ...COMPONENTS
  ],
  declarations: [
    ...COMPONENTS
  ],
  providers: [],
})

export class SharedModule {
  // static forRoot(): ModuleWithProviders {
  //   return {
  //     ngModule: SharedModule,
  //     providers: [NameListService]
  //   };
  // }
 }
