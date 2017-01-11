import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BrowseNavigationService } from '../browse-navigation.service';

@Component({
  selector: 'browse-navigation',
  templateUrl: 'browse-navigation.component.html',
  styleUrls: ['../browse.component.scss'],
  providers: [BrowseNavigationService]
})
export class BrowseNavigationComponent implements OnInit {

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
