import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class TicketsSearchService {

  genres: any[];
  oldSearch: string = '';
  topEvents: any[];
  genreItem: any[];
  pageNum: number = 0;
  items: number;
  tickets: any[];
  url: string;
  date: string;
  venue: string;
  city: string;
  country: string;
  state: string;
  latitude: number = 1000;
  longitude: number = 1000;

  displayTickets: any[];
  hasTickets: boolean;

  apiKey: string = 'XXXXX';
  endDateTime: string = '2018-01-01T00:00:00Z';

  constructor(private http: Http) { }

  /**
   * Calls the TicketMaster api to get a list of the tickets available for
   * the search term containing the name of the event, a link to it, its date, 
   * venue, city, state, country, latitude, and longitude.
   * 
   * If the artist is performing more than once at the same location, then the
   * latitude and longitude of the previous entry in the tickets list is used.
   * If the venue has no location data, the default, dummy values for latitude 
   * and longitude are used.
   * If the ticket is for a tribute act, exclude it.
   * 
   * 
   * @param search: the name of the artist to search
   * @returns a list of ticktes for the search term
   */
  searchEvents(search): Observable<any[]> {
    if (this.oldSearch !== search) {
      this.oldSearch = search;
      this.tickets = [];
      this.pageNum = 0;
    }
    let params = new URLSearchParams();
    params.set('keyword', search + ' Music');
    params.set('endDateTime', this.endDateTime);
    params.set('apikey', this.apiKey);
    params.set('page', this.pageNum.toString());
    return this.http.get('https://app.ticketmaster.com/discovery/v2/events.json', { search: params })
    .map((response: Response) => {
      console.log(JSON.stringify(response));
      if (response.json().hasOwnProperty('_embedded')) {
        response.json()._embedded.events.map(event => {
          this.url = event.url;
          this.date = event.dates.start.localDate;
          event._embedded.venues.map(venue => {
            this.getVenueData(venue);
            if (this.tickets.length > 0) {
              // If performing multi night shows get location of prev night  
              if (this.tickets[this.tickets.length - 1].venue === venue.name &&
                  this.tickets[this.tickets.length - 1].city === venue.city.name &&
                  this.tickets[this.tickets.length - 1].country === venue.country.countryCode &&
                  (!(venue.hasOwnProperty('location') && this.tickets[this.tickets.length - 1].lat === 1000))) {
                this.latitude = this.tickets[this.tickets.length - 1].lat;
                this.longitude = this.tickets[this.tickets.length - 1].lng;
              }
              // If a is location given
              else if (venue.hasOwnProperty('location')) {
                this.latitude = venue.location.latitude;
                this.longitude = venue.location.longitude;
              }
            }
            // If the first element has a location
            else if (venue.hasOwnProperty('location')) {
              this.latitude = venue.location.latitude;
              this.longitude = venue.location.longitude;
            }
          });
          // Check if its a tribute act
          if (event.name.toLowerCase().indexOf('tribute') === -1 && event.name.toLowerCase().indexOf(search[0].toLowerCase()) !== -1) {
            this.tickets.push({name: event.name, url: event.url, date: event.dates.start.localDate,
            venue: this.venue, city: this.city, state: this.state,
            country: this.country, lat: this.latitude, lng: this.longitude});
          }
        });
        // If there are more pages keep going
        if (this.pageNum < response.json().page.totalPages) {
          this.pageNum++;
          this.searchEvents(this.oldSearch);
        }
      } else {
        this.tickets = [];
      }
      console.log(JSON.stringify(this.tickets));
      return this.tickets;
    });
  }

  /**
   * Calls the TicketMaster api to get a list of the tickets available for
   * the search term containing the name of the event, a link to it, its date, 
   * venue, city, state, and country.
   * 
   * @param search: the name of the artist to search
   * @returns a list of ticktes for the search term
   */
  simpleSearchEvents(search): Observable<any[]> {
    this.tickets = [];
    this.pageNum = 0;
    let params = new URLSearchParams();
    params.set('keyword', search + ' Music');
    params.set('endDateTime', '2018-01-01T00:00:00Z');
    params.set('apikey', this.apiKey);
    params.set('page', this.pageNum.toString());
    return this.http.get('https://app.ticketmaster.com/discovery/v2/events.json', {search: params})
    .map((response: Response) => {
      if (response.json().hasOwnProperty('_embedded')) {
        response.json()._embedded.events.map(event => {
          this.url = event.url;
          this.date = event.dates.start.localDate;
          event._embedded.venues.map(venue => {
            this.getVenueData(venue);
          });
          if (event.name.toLowerCase().indexOf('tribute') === -1 && event.name.toLowerCase().indexOf(search[0].toLowerCase()) !== -1) {
            this.tickets.push({name: event.name, url: event.url, date: event.dates.start.localDate,
            venue: this.venue, city: this.city, state: this.state,
            country: this.country});
          }
        });
      } else {
        this.tickets = [];
      }
      this.getProfileTickets(this.tickets);
      return this.tickets;
    });
  }

  /**
   * Parses the venue field from the api response to get the names 
   * of the venue, city, state code and country code.
   * 
   * @param venue: venue field from the api response
   */
  getVenueData(venue) {
    if (venue.hasOwnProperty('name')) {
      this.venue = venue.name;
    } else {
      this.venue = '';
    }
    if (venue.hasOwnProperty('city')) {
      this.city = venue.city.name;
    } else {
      this.city = '';
    }
    if (venue.hasOwnProperty('country')) {
      this.country = venue.country.countryCode;
    } else {
      this.country = '';
    }
    if (venue.hasOwnProperty('state')) {
      this.state = venue.state.stateCode;
    } else {
      this.state = '';
    }
  }

  /**
   * Assigns variables for displaying tickets on the artists profile page.
   * 
   * If the artist has more than 4 tickets only display the most recent 4
   * and if the artist has no tickets set the hasTickets boolean to false to 
   * display that the artist has no tickets available.
   * 
   * @param tickets: list of tickets
   */
  getProfileTickets(tickets) {
    if (this.tickets.length !== 0) {
      if (this.tickets.length > 4) {
        this.displayTickets = tickets.slice(0, 4);
      } else {
        this.displayTickets = tickets;
      }
      this.hasTickets = true;
    } else {
      this.hasTickets = false;
    }
  }

}
