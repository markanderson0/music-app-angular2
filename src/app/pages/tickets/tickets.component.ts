import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TicketsNavigationService } from './tickets-navigation.service';

@Component({
  selector: 'tickets',
  templateUrl: 'tickets.component.html',
  styleUrls: ['./tickets.component.scss'],
  providers: [TicketsNavigationService]
})
export class TicketsComponent implements OnInit {

  genres: any[];
  isCollapsed: boolean = false;
  searchTerm: string;

  constructor(private router: Router, private ticketsNavigationService: TicketsNavigationService) {
    this.genres = ticketsNavigationService.getTicketGenres();
   }

  ngOnInit() { }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }

  search() {
    this.router.navigate(['tickets/search', { query: this.searchTerm }]);
  }

  openTopTickets() {
    this.router.navigate(['/tickets']);
  }

  openTicketGenre(genre: string) {
    this.router.navigate(['tickets/genre', genre]);
  }
}
