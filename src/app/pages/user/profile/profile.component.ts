import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'profile',
  templateUrl: 'profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profilePicture = '/img/angular.png';
  bannerPicture = '/img/typo01.png';
  username = 'testUser';
  sort: Array<string>;

  constructor() {
    this.sort = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
   }

  ngOnInit() { }
}
