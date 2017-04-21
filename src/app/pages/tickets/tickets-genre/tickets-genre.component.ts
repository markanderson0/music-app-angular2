import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TicketsGenreService } from './tickets-genre.service';
import { TicketsNavigationService } from '../tickets-navigation.service';

@Component({
  selector: 'tickets-genre',
  templateUrl: 'tickets-genre.component.html',
  styleUrls: ['./tickets-genre.component.scss', '../top-tickets/top-tickets.component.scss'],
  providers: [TicketsGenreService, TicketsNavigationService]
})
export class TicketsGenreComponent implements OnInit {

  searchTerm: string;
  category: string;
  eventArtists: string[];
  topEvents: string[];
  loadMore: boolean = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ticketsGenreService: TicketsGenreService,
    private ticketsNavigationService: TicketsNavigationService
  ) { }

  /**
   * Retrieves the genre from the route then calls the ticketsNavigationService
   * to get the name of the category to display on the 'Top (category) Events'
   * label and the name of the searchTerm that is used to make the api call
   * to get the list of tickets.
   */
  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      let genre = params['genre'];
      this.topEvents = [];
      this.category = this.ticketsNavigationService.getTicketName(genre, 'label');
      this.searchTerm = this.ticketsNavigationService.getTicketSearch(genre, 'label');
      this.ticketsGenreService.getTopTickets(this.searchTerm)
      .subscribe(topEvents => this.topEvents = topEvents);
      this.ticketsGenreService.getGenreTickets(this.ticketsNavigationService.getTicketEventSearch(this.searchTerm, 'search'), 0, [])
      .then(artist => {
        this.eventArtists = artist;
        this.loadMore = this.ticketsGenreService.loadMore;
      });

    });
  }

  /**
   * Calls the ticketsGenreService to get the next page of tickets.
   */
  getMoreResults() {
    this.ticketsGenreService.getMoreResults(this.eventArtists)
    .then(artist => {
      this.eventArtists = artist;
      this.loadMore = this.ticketsGenreService.loadMore;
    });
  }

  openArtistTickets(artist: string) {
    this.router.navigate(['tickets/artist', artist]);
  }
}
