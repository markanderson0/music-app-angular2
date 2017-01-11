import { Component, ViewContainerRef } from '@angular/core';

import { GlobalState } from './global.state';

import '../style/app.scss';

@Component({
  selector: 'my-app', // <my-app></my-app>
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss', './shared/main-sidebar/main-sidebar.component.scss', './shared/main-sidebar/small-sidebar.scss'],
})
export class AppComponent {
  url = 'https://github.com/preboot/angular2-webpack';
  isSidebarCollapsed: boolean = false;
  private viewContainerRef: ViewContainerRef;

  constructor(private _state: GlobalState, viewContainerRef: ViewContainerRef) {
    this._state.subscribe('sidebar.isCollapsed', (isCollapsed) => {
      this.isSidebarCollapsed = isCollapsed;
    });

    this.viewContainerRef = viewContainerRef;
  }
}
