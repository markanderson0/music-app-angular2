import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TicketsGenreService } from '../tickets-genre/tickets-genre.service';

@Component({
  selector: 'top-tickets',
  templateUrl: 'top-tickets.component.html',
  styleUrls: ['./top-tickets.component.scss'],
  providers: [TicketsGenreService]
})
export class TopTicketsComponent implements OnInit {

  topEvents: any[];

  constructor(private router: Router, private ticketsGenreService: TicketsGenreService) { }

  ngOnInit() {
    this.ticketsGenreService
      .getTopTickets('top-tickets')
      .subscribe(topEvents => this.topEvents = topEvents);
   }

  openArtistTickets(artist: string) {
    this.router.navigate(['tickets/artist', artist]);
  }
}
