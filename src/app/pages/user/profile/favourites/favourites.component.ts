import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FavouritesService } from './favourites.service';

@Component({
  selector: 'favourites',
  templateUrl: 'favourites.component.html',
  styleUrls: ['../../following/following.component.scss', './favourites.component.scss', '../profile.component.scss'],
  providers: [FavouritesService]
})
export class FavouritesComponent implements OnInit {

  favourites: any[];
  errorMessage: string;
  // sort = ['0-9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

  constructor(private favouritesService: FavouritesService, private router: Router) { }

  /**
   * Calls the favouritesService to get a list of the users favourite videos.
   */
  ngOnInit() {
    this.favouritesService.getFavourites()
                     .subscribe(
                       favourites => this.favourites = favourites,
                       error =>  this.errorMessage = <any>error);
  }

  openVideo(name: string, show: string, playlist: string, video: string) {
    this.router.navigate(['/video/' + name + '/' + show + '/' + playlist + '/' + video]);
  }
}
