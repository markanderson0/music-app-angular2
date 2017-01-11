import { Injectable } from '@angular/core';

@Injectable()
export class TicketsNavigationService {

  genres: any[];

  constructor() {
    this.genres = [{
      label: 'alt&indie',
      name: 'Alt / Indie',
      search: 'alt',
      apiCode: '8cb34a3a-8b97-4a28-bbf1-68d49524f117',
      genre: 'alternative',
      eventSearch: 'alternative rock'
    }, {
      label: 'clubs&dance',
      name: 'Clubs / Dance',
      search: 'elect',
      apiCode: 'b3aac808-2ef9-451f-ac32-2e8bd47c9fea',
      genre: 'electronic-dance-techno',
      eventSearch: 'dance / electronic'
    }, {
      label: 'counrty&folk',
      name: 'Country / Folk',
      search: 'folk',
      apiCode: 'f03838c7-ebc3-4240-b2f7-6f219cd9dc8c',
      genre: 'country-folk',
      eventSearch: 'country'
    }, {
      label: 'festivals',
      name: 'Festivals',
      search: 'fest',
      apiCode: '1d5215df-7735-4d77-875b-c3958d23103e',
      genre: 'concerts',
      eventSearch: 'festival'
    }, {
      label: 'hardrock&metal',
      name: 'Hard Rock / Metal',
      search: 'hard-rock',
      apiCode: '6ea043fd-1c8f-42fc-9050-1cdde232c419',
      genre: 'hard-rock-metal-punk',
      eventSearch: 'metal'
    }, {
      label: 'jazz&blues',
      name: 'Jazz / Blues',
      search: 'blues',
      apiCode: 'a861a49b-c30d-4467-8117-9d58f80b6763',
      genre: 'jazz-and-blues',
      eventSearch: 'jazz / blues'
    }, {
      label: 'rnb&urban',
      name: 'R&B / Urban',
      search: 'rnb',
      apiCode: 'd590a30c-ed8d-4f88-9966-4ac9bfecbd0a',
      genre: 'randb-and-soul',
      eventSearch: 'r&b / soul'
    }, {
      label: 'rap&hiphop',
      name: 'Rap / Hip-Hop',
      search: 'rap',
      apiCode: 'c16afc51-1bf8-4cdc-a687-6ca72558d83c',
      genre: 'rap-and-hip-hop',
      eventSearch: 'rap / hip hop'
    }, {
      label: 'rock&pop',
      name: 'Rock / Pop',
      search: 'rock',
      apiCode: '65898b3d-61fb-4c62-8d6b-8bea5cbfea79',
      genre: 'rock-and-pop',
      eventSearch: 'rock / pop'
    }, {
      label: 'world',
      name: 'World',
      search: 'world',
      apiCode: '7de32e87-b01a-429b-bd5e-4832c923a434',
      genre: 'world-and-latin-music-tickets',
      eventSearch: 'world'
    }];
  }

  getTicketGenres() {
    return this.genres;
  }

  getTicketLabel(val, key) {
    return this.genres.find(function(ticket){
      return ticket[key] === val;
    }).label;
  }

  getTicketName(val, key) {
    return this.genres.find(function(ticket){
      return ticket[key] === val;
    }).name;
  }

  getTicketSearch(val, key) {
    return this.genres.find(function(ticket){
      return ticket[key] === val;
    }).search;
  }

  getTicketApiCode(val, key) {
    return this.genres.find(function(ticket){
      return ticket[key] === val;
    }).apiCode;
  }

  getTicketGenre(val, key) {
    return this.genres.find(function(ticket){
      return ticket[key] === val;
    }).genre;
  }

  getTicketEventSearch(val, key) {
    return this.genres.find(function(ticket){
      return ticket[key] === val;
    }).eventSearch;
  }
}
