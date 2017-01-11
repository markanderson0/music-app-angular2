import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainMenuService } from '../main-menu.service';
import { ProfileMenuService } from '../profile-menu.service';

@Component({
  selector: 'main-sidebar-collapsed',
  templateUrl: 'main-sidebar-collapsed.component.html',
  styleUrls: ['../small-sidebar.scss', '../profile-menu.scss'],
  providers: [MainMenuService, ProfileMenuService]
})
export class MainSidebarCollapsedComponent implements OnInit {

  mainMenuItems: any[];
  profileMenuItems: any[];
  showHoverElem: boolean;
  hoverElemHeight: number;
  hoverElemTop: number;
  toggleMenu = false;
  searchTerm: string;

  constructor(private router: Router, private mainMenuService: MainMenuService, private profileMenuService: ProfileMenuService) {
    this.mainMenuItems = mainMenuService.getMenuItems();
    this.profileMenuItems = profileMenuService.getMenuItems();
   }

  ngOnInit() { }

  openProfilePage(page: string): void {
    let link = ['/profile/', page];
    this.router.navigate(link);
  }

  openPage(page: string): void {
    let link = ['/', page];
    this.router.navigate(link);
  }

  search(): void {
    let link = ['/search', { query: this.searchTerm }];
    this.router.navigate(link);
  }

  hoverItem($event) {
    this.showHoverElem = true;
    this.hoverElemHeight =  $event.currentTarget.clientHeight;
    this.hoverElemTop = $event.currentTarget.getBoundingClientRect().top;
  }
}
