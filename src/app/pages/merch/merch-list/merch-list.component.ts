import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MerchListService } from './merch-list.service';
import { MerchNavigationService } from '../merch-navigation.service';
import { MerchProductService } from '../merch-product/merch-product.service';

@Component({
  selector: 'merch-list',
  templateUrl: 'merch-list.component.html',
  styleUrls: ['./merch-list.component.scss'],
  providers: [MerchListService, MerchNavigationService, MerchProductService]
})
export class MerchListComponent implements OnInit {

  merch = [];
  merchSortOptions = this.merchListService.merchSortOptions;
  merchSort: string;
  apparelPage: boolean;
  musicPage: boolean;

  category: string;
  query: string;
  searchTerm: string;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private merchListService: MerchListService,
    private merchProductService: MerchProductService,
    private merchNavigationService: MerchNavigationService
  ) {  }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      this.merch = [];
      if (params.hasOwnProperty('category')) {
        this.category = params['category'];
        let categoryName = this.merchNavigationService.getMerchSearch(this.category);
        let categoryId = this.merchNavigationService.getMerchCategory(this.category);
        this.merchListService.getMerch(categoryName, categoryId, 1, 'Best Match', this.merch)
        .then(merch => {
          this.merch = merch;
          this.merchSort = this.merchListService.merchSort;
          this.apparelPage = this.merchListService.apparelPage;
          this.musicPage = this.merchListService.musicPage;
        });
      }
      else {
        this.query = params['query'];
        this.merchListService.getMerch(this.query, '11450', 1, 'Best Match', this.merch)
        .then(merch => {
        this.merch = merch;
        this.merchSort = this.merchListService.merchSort;
        this.apparelPage = this.merchListService.apparelPage;
        this.musicPage = this.merchListService.musicPage;
      });
      }
    });

   }

  search() {
    this.router.navigate(['merch/search', { query: this.searchTerm }]);
  }

  openTopMerch() {
    this.router.navigate(['/merch']);
  }

  openMerchProduct(id: string) {
    this.router.navigate(['merch/product', id]);
  }

  setMerchItem(name, url, pic, price) {
    this.merchProductService.setMerchItem(name, url, pic, price);
  }

  getMoreMerch() {
    this.merchListService.getMoreMerch();
  }

  sortResults() {
    this.merchListService.sortResults(this.merchSort);
    this.merchSort = this.merchListService.merchSort;
    this.merch = this.merchListService.merch;
  }

  filterResults(val) {
    this.merchListService.filterResults(val);
    this.merchSort = this.merchListService.merchSort;
    this.merch = this.merchListService.merch;
  }

  searchMerch() {
    this.merchListService.searchMerch();
    this.merch = this.merchListService.merch;
  }
}
