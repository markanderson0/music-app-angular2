import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FollowingService } from '../../following/following.service';

@Component({
  selector: 'following',
  templateUrl: 'following.component.html',
  styleUrls: ['../../following/following.component.scss'],
  providers: [FollowingService]
})
export class FollowingComponent implements OnInit {

  artists: any[];
  errorMessage: string;

  constructor(private followingService: FollowingService, private router: Router) { }

  ngOnInit() {
    this.getFollowingArtists();
  }

  /**
   * Calls the followingService to get a list of artists contining their
   * name and picture.
   */
  getFollowingArtists() {
    this.followingService.getFollowingArtists()
                     .subscribe(
                       artists => this.artists = artists,
                       error =>  this.errorMessage = <any>error);
  }

  openArtistProfile(name: string) {
    this.router.navigate(['/artist/' + name + '/profile']);
  }

  openArtistVideos(name: string) {
    this.router.navigate(['/artist/' + name + '/videos']);
  }
}
