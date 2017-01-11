import { Injectable } from '@angular/core';

@Injectable()
export class MainMenuService {

  mainMenuItems: any[];

  constructor() {
    this.mainMenuItems = [{
      title: 'Browse', icon: 'fa fa-bars', state: 'browse'
    },
    {
      title: 'Tickets', icon: 'fa fa-ticket', state: 'tickets'
    },
    {
      title: 'Merch', icon: 'fa fa-shopping-cart', state: 'merch'
    }];
  }

  getMenuItems(): any[] {
    return this.mainMenuItems;
  }
}
