import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BrowseNavigationService } from './browse-navigation.service';

@Component({
  selector: 'browse',
  template: `<router-outlet></router-outlet>`,
  styleUrls: ['./browse.component.scss'],
  providers: [BrowseNavigationService]
})
export class BrowseComponent implements OnInit {

  genres: any[];

  constructor(private router: Router, private browseNavigationService: BrowseNavigationService) {
    this.genres = this.browseNavigationService.getBrowseGenres();
  }

  ngOnInit() { }

  openGenre(genre: string) {
    this.router.navigate(['browse/genre', genre]);
  }

  openArtistPage(artist: string) {
    this.router.navigate(['/artist', artist]);
  }
}
