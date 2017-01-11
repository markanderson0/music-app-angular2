import { Injectable } from '@angular/core';

@Injectable()
export class MerchNavigationService {

  categories: any[];

  constructor() {
    this.categories = [{
        label: 'apparel',
        name: 'Apparel',
        search: 'band tshirt',
        cat: '11450'
    }, {
        label: 'accessories',
        name: 'Accessories',
        search: 'band merch',
        cat: '2329'
    }, {
        label: 'music',
        name: 'Music',
        search: 'cds and vinyl',
        cat: '11233'
    }, {
        label: 'art',
        name: 'Art',
        search: 'band posters',
        cat: '158658'
    }];
  }

  getMerchCategories() {
    return this.categories;
  }

  getMerchSearch(val) {
    return this.categories.find(function(merch){
      return merch.label === val;
    }).search;
  }

  getMerchCategory(val) {
    return this.categories.find(function(merch){
      return merch.label === val;
    }).cat;
  }

}
