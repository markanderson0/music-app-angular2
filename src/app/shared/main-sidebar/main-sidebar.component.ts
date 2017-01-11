import { Component, OnInit, HostListener } from '@angular/core';
import { GlobalState } from '../../global.state';

@Component({
  selector: 'main-sidebar',
  templateUrl: 'main-sidebar.component.html',
  styleUrls: ['./main-sidebar.component.scss', './small-sidebar.scss']
})
export class MainSidebarComponent implements OnInit {

  public isSidebarCollapsed: boolean = false;
  public isSidebarShouldCollapsed: boolean = false;

  constructor(private _state: GlobalState) {
    this._state.subscribe('sidebar.isCollapsed', (isCollapsed) => {
      this.isSidebarCollapsed = isCollapsed;
    });
  }

  public ngOnInit(): void {
    if (this._shouldSidebarCollapse()) {
      this.sidebarCollapse();
    }
  }

  @HostListener('window: resize')
  public onWindowResize(): void {
    let isSidebarShouldCollapsed = this._shouldSidebarCollapse();

    if (this.isSidebarShouldCollapsed !== isSidebarShouldCollapsed) {
      this.sidebarCollapseStateChange(isSidebarShouldCollapsed);
    }
    this.isSidebarShouldCollapsed = isSidebarShouldCollapsed;
  }

  public sidebarExpand(): void {
    this.sidebarCollapseStateChange(false);
  }

  public sidebarCollapse(): void {
    this.sidebarCollapseStateChange(true);
  }

  public sidebarCollapseStateChange(isCollapsed: boolean): void {
    this.isSidebarCollapsed = isCollapsed;
    this._state.notifyDataChanged('sidebar.isCollapsed', this.isSidebarCollapsed);
  }

  private _shouldSidebarCollapse(): boolean {
    if (window.innerWidth < 1200) {
      this.sidebarCollapse();
      return true;
    }
    else {
      this.sidebarExpand();
      return false;
    }
  }
}
