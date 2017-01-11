import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SearchService } from './search.service';

@Component({
  selector: 'search',
  templateUrl: 'search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [SearchService]
})
export class SearchComponent implements OnInit {

  results: Array<any>;
  query: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private searchService: SearchService
  ) { }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      this.query = params['query'];
      this.searchService
      .searchArtists(this.query, '20')
      .subscribe(results => {
        this.results = results;
      });
    });
   }

  openArtistProfile(name: string) {
    this.router.navigate(['/artist/' + name + '/profile']);
  }
}
