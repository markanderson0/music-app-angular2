import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TicketsSearchService } from './tickets-search.service';

@Component({
  selector: 'tickets-search',
  templateUrl: 'tickets-search.component.html',
  styleUrls: ['./tickets-search.component.scss'],
  providers: [TicketsSearchService]
})
export class TicketsSearchComponent implements OnInit {

  tickets: any[];
  artist: string;
  marker: any[];
  markers: any[];
  showList: boolean = true;
  showMap: boolean = false;

  zoom: number = 2;
  lat: number = 44.5403;
  lng: number = -78.5463;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ticketsSearchService: TicketsSearchService
  ) { }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      if (params.hasOwnProperty('artist')) {
        this.artist = params['artist'];
      }
      else {
        this.artist = params['query'];
      }
      this.ticketsSearchService
      .searchEvents(this.artist)
      .subscribe(item => {
        this.tickets = item;
        this.setMarkers();
      });
    });
  }

  openMap() {
    this.showList = false;
    this.showMap = true;
  }

  openList() {
    this.showList = true;
    this.showMap = false;
  }

  setMarkers() {
    this.markers = [];
    for (let i = 0; i < this.tickets.length; i++) {
      this.marker = [];
      if (i > 0 && this.tickets[i - 1].lat === this.tickets[i].lat && this.tickets[i - 1].lng === this.tickets[i].lng) {
        this.markers[this.markers.length - 1].marker.push({
          name: this.tickets[i].name,
          date: this.tickets[i].date,
          venue: this.tickets[i].venue,
          url: this.tickets[i].url
        });
      }
      else {
        this.marker.push({
          name: this.tickets[i].name,
          date: this.tickets[i].date,
          venue: this.tickets[i].venue,
          url: this.tickets[i].url
        });
        this.markers.push({marker: this.marker, lat: parseFloat(this.tickets[i].lat), lng: parseFloat(this.tickets[i].lng)});
      }
    }
    console.log('Markers: ' + this.markers);
  }

  openArtistTickets(artist: string) {
    this.router.navigate(['tickets/artist', artist]);
  }

  openLink(url) {
    window.open(url);
  }
}
