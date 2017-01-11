import { Injectable } from '@angular/core';

@Injectable()
export class ProfileMenuService {

  profileMenuItems: any[];

  constructor() {
    this.profileMenuItems = [{
      title: 'Profile', picture: '/img/angular.png',
      subProfileMenu: [{
        title: 'Profile', icon: 'fa fa-user', state: 'profile'
      },
      {
        title: 'Following', icon: 'fa fa-heart', state: 'following'
      },
      {
        title: 'Upload', icon: 'fa fa-upload', state: 'upload'
      },
      {
        title: 'Settings', icon: 'fa fa-gear', state: 'settings'
      }]
    }];
  }

  getMenuItems(): any[] {
    return this.profileMenuItems;
  }
}
