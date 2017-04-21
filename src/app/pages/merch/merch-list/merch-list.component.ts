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

  /**
   * If the route paramaters have the category property, retrieve the 
   * category from the route then get the category name and id from 
   * the merchNavigationService. Then the merchListService is used to 
   * get the the list of merch items for that category.
   * Otherwise the retrieve the search query from the route and
   * use the merchListService to get the list of items associated
   * with the search term.
   */
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
      } else {
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

  /**
   * Set the selected merch item in the merchProductService.
   * 
   * @param name: name of the merch item
   * @param url: link to the merch item
   * @param pic: picture of the merch item
   * @param price: price of the merch item
   */
  setMerchItem(name, url, pic, price) {
    this.merchProductService.setMerchItem(name, url, pic, price);
  }

  /**
   * Load the next group of merch.
   */
  getMoreMerch() {
    this.merchListService.getMoreMerch();
  }

  /**
   * Sort the merch items by either 'Best Match',
   * 'Price Ascending' or 'Price Decending'.
   */
  sortResults() {
    this.merchListService.sortResults(this.merchSort);
    this.merchSort = this.merchListService.merchSort;
    this.merch = this.merchListService.merch;
  }

  /**
   * Filter the apparel or music pages by wither Men or Women and
   * Cds or Vinyl respectively.
   */
  filterResults(val) {
    this.merchListService.filterResults(val);
    this.merchSort = this.merchListService.merchSort;
    this.merch = this.merchListService.merch;
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
}
