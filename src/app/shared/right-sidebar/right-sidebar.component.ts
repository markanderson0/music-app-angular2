import { Component, OnInit, HostListener } from '@angular/core';
import { GlobalState } from '../../global.state';

@Component({
  selector: 'right-sidebar',
  templateUrl: 'right-sidebar.component.html',
  styleUrls: ['./right-sidebar.component.scss']
})
export class RightSidebarComponent implements OnInit {

  public isRightSidebarCollapsed: boolean = false;
  public isRightSidebarShouldCollapsed: boolean = false;

  constructor(private _state: GlobalState) {
    this._state.subscribe('rightSidebar.isCollapsed', (isCollapsed) => {
      this.isRightSidebarCollapsed = isCollapsed;
    });
  }

  public ngOnInit(): void {
    if (this._shouldRightSidebarCollapse()) {
      this.rightSidebarCollapse();
    } else {
      this.rightSidebarExpand();
    }
  }

  @HostListener('window: resize')
  public onWindowResize(): void {
    let isRightSidebarShouldCollapsed = this._shouldRightSidebarCollapse();

    if (this.isRightSidebarShouldCollapsed !== isRightSidebarShouldCollapsed) {
      this.rightSidebarCollapseStateChange(isRightSidebarShouldCollapsed);
    }
    this.isRightSidebarShouldCollapsed = isRightSidebarShouldCollapsed;
  }

  public rightSidebarExpand(): void {
    this.rightSidebarCollapseStateChange(false);
  }

  public rightSidebarCollapse(): void {
    this.rightSidebarCollapseStateChange(true);
  }

  public rightSidebarCollapseStateChange(isCollapsed: boolean): void {
    this.isRightSidebarCollapsed = isCollapsed;
    this._state.notifyDataChanged('rightSidebar.isCollapsed', this.isRightSidebarCollapsed);
  }

  private _shouldRightSidebarCollapse(): boolean {
    if (window.innerWidth < 1200) {
      this.rightSidebarCollapse();
      return true;
    } else {
      this.rightSidebarExpand();
      return false;
    }
  }
}
