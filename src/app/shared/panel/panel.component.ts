import { Component, OnInit } from '@angular/core';
import { GlobalState } from '../../global.state';

@Component({
  selector: 'panel',
  templateUrl: 'panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {

  public isRightSidebarCollapsed: boolean = false;

  constructor(private _state: GlobalState) {
    this._state.subscribe('rightSidebar.isCollapsed', (isCollapsed) => {
      this.isRightSidebarCollapsed = isCollapsed;
    });
  }

  ngOnInit() {
  }
}
