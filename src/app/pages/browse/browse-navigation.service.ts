import { Injectable } from '@angular/core';

@Injectable()
export class BrowseNavigationService {

  genres: any[];

  constructor() {
    this.genres = [{
      label: 'rock',
      name: 'Rock',
      pic: '/img/browse/rock.png',
      search: [{user: 'spotify', id: '0lbtgFu3JNKX77J5YOpW7n'},
              {user: 'spotify_uk_', id: '3jgQOc0rIN5POlnuVof0ck'},
              {user: 'spotify', id: '49rhYazWkqe8Ojb5n2NRQI'},
              {user: 'spotify', id: '2YoVrFsJPvunjHQYfM12cP'},
              {user: 'spotify', id: '0JHYU9yefyVvlYAi2WTdKc'}]
    }, {
      label: 'indie',
      name: 'Indie',
      pic: '/img/browse/indie.png',
      search: [{user: 'spotify_uk_', id: '5jVou6V5D3KjP8uk7hj1cu'},
              {user: 'spotify_uk_', id: '6xMPP2ISd3YgzbVuS7wUbm'},
              {user: 'spotify_uk_', id: '33yjWFG5onxZu3HdIzO1Zu'},
              {user: 'radioactivehits', id: '6YIUyrbhCFYIumJYUlPZZL'},
              {user: 'spotify', id: '75dwLdmL07hDEDWqX17QeE'}]
    }, {
      label: 'dance',
      name: 'Dance',
      pic: '/img/browse/dance.png',
      search: [{user: 'spotify_uk_', id: '7wUUwoxU2S6BRKA2bDPYKD'},
              {user: 'spotify', id: '04MJzJlzOoy5bTytJwDsVL'},
              {user: 'spotify', id: '1GQLlzxBxKTb6tJsD4RxHI'},
              {user: 'spinninrecordsofficial', id: '5aHawERps0AMmMLU1KHvv6'},
              {user: 'spotify', id: '5rJNwG9BImUMYDrN5D3aUi'}]
    }, {
      label: 'hiphip',
      name: 'Hip Hop',
      pic: '/img/browse/hiphop.png',
      search: [{user: 'spotify', id: '5yolys8XG4q7YfjYGl5Lff'},
              {user: 'spotify', id: '2qlMTcW6AnnaGl7eXWAZP5'},
              {user: 'spotify', id: '1szpIhNJgnxKw85IewWwTU'},
              {user: 'spotify', id: '0uwYJZW8x5ArMIUJR4WUZF'},
              {user: 'spotify', id: '4jONxQje1Fmw9AFHT7bCp8'}]
    }, {
      label: 'rnb',
      name: 'RnB',
      pic: '/img/browse/rnb.png',
      search: [{user: 'spotify_uk_', id: '5rZjd5MqTPPCtrpX2hvKHt'},
              {user: 'spotify', id: '5zRlalcDw1qdHLc3lqfmHp'},
              {user: 'spotify', id: '51HFHO33vXhvUElwtD9eBD'},
              {user: 'playlists.germany', id: '2PtnenL9aQ2oZlyJFEblq5'},
              {user: 'spotify', id: '3IWEp81rnAsLo5Z4DferTi'}]
    }, {
      label: 'country',
      name: 'Country',
      pic: '/img/browse/country.png',
      search: [{user: 'spotify', id: '4ecQaDJHF55Ls9m2lKIXbI'},
              {user: 'spotify', id: '3JtIIyGCZBCTphGyrbhG16'},
              {user: 'spotify', id: '0Sb1hi1Qh0W6LuGiifPJYv'},
              {user: 'spotify', id: '1ZlYbJOdgIXQ3uegI4siME'},
              {user: 'digster.fm', id: '6nU0t33tQA2i0qTI5HiyRV'}]
    }, {
      label: 'folk',
      name: 'Folk',
      pic: '/img/browse/folk.png',
      search: [{user: 'spotify', id: '5u9r9hti3uVfQVhLOEWA4g'},
              {user: 'spotify', id: '6ORPPIGa0FjkwfJVTYkfKu'},
              {user: 'spotify', id: '6nIJS5m3ZyG9nNghjQNAug'},
              {user: 'spotify', id: '6NCfeirBIrZfYcs9kwnS3x'},
              {user: 'spotify', id: '5mRQ1OKwXfOuTCXftFu62R'}]
    }, {
      label: 'metal',
      name: 'Metal',
      pic: '/img/browse/metal.png',
      search: [{user: 'spotify', id: '2p3L8b22Bpff0oqjABt6e4'},
              {user: 'spotify', id: '2k2AuaynH7E2v8mwvhpeAO'},
              {user: 'spotify', id: '1tU9N8iyO6oHPh25g4MPk7'},
              {user: 'spotify', id: '3vyS89PZHAELXfKFT99aBK'},
              {user: 'spotify', id: '7tIim3qlaUUT1vXe43VlAA'}]
    }];
  }

  getBrowseGenres() {
    return this.genres;
  }

  getBrowseLabel(val, key) {
    return this.genres.find(browse => {
      return browse[key] === val;
    }).label;
  }

  getBrowseName(val, key) {
    return this.genres.find(browse => {
      return browse[key] === val;
    }).name;
  }

  getBrowseSearch(val, key) {
    return this.genres.find(browse => {
      return browse[key] === val;
    }).search;
  }

}
