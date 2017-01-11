  import { Injectable } from '@angular/core';
  import { Http, Response, URLSearchParams } from '@angular/http';
  import 'rxjs/add/operator/toPromise';

  @Injectable()
  export class MerchListService {

  merch = [];
  merchSearch = {};
  merchSort = 'Best Match';
  merchSortOptions = 'Best Match,Price (Asc),Price (Dec)';
  apparelPage: boolean = false;
  musicPage: boolean;
  vinylPage: boolean = false;
  hasMerch: boolean;

  categoryName: string = '';
  categoryId: any;
  pageNumber: number = 1;
  oldSort: string = '';
  sortValue: string;
  displayMerch: any[];
  search: string;

  apiKey: string = 'XXXXX';

  constructor(private http: Http) { }

  getMerch(name, categoryId, pageNum, sort, merch): Promise<any[]> {
      this.merch = merch;
      this.categoryName = name;
      this.categoryId = categoryId;
      if (sort === undefined) {
        this.merchSort = 'Best Match';
        this.sortValue = 'BestMatch';
      }
      else {
        this.merchSort = sort;
        this.sortValue = this.setSortValue(sort);
      }

      if (merch === undefined) {
        this.merch = [];
      }
      else {
        this.merch = merch;
      }

      this.checkMerchPage(name);
      let params = new URLSearchParams();
      params.set('OPERATION-NAME', 'findItemsAdvanced');
      params.set('SERVICE-VERSION', '1.0.0');
      params.set('SECURITY-APPNAME', this.apiKey);
      params.set('RESPONSE-DATA-FORMAT', 'JSON');
      params.set('keywords', this.categoryName);
      params.set('categoryId', this.categoryId);
      params.set('sortOrder', this.sortValue);
      params.set('outputSelector', 'AspectHistogram');
      params.set('paginationInput.pageNumber', pageNum);
      params.set('itemFilter(0).name', 'Condition');
      params.set('itemFilter(0).value', 'New');
      return this.http.get('http://svcs.ebay.com/services/search/FindingService/v1', { search: params })
      .toPromise()
      .then((response: Response) => {
        if (response.json().findItemsAdvancedResponse[0].searchResult[0].hasOwnProperty('item')) {
          response.json().findItemsAdvancedResponse[0].searchResult[0].item.map(item => {
            let itemId = item.itemId[0];
            let itemName = item.title[0];
            let itemUrl = item.viewItemURL[0];
            let itemPic = 'http://thumbs1.ebaystatic.com/pict/04040_0.jpg';
            let totalPrice = 0;
            if (item.hasOwnProperty('galleryURL')) {
              itemPic = item.galleryURL[0];
            }
            let itemPrice = item.sellingStatus[0].convertedCurrentPrice[0].__value__;
            if (item.shippingInfo[0].hasOwnProperty('shippingServiceCost')) {
              let itemShipPrice = item.shippingInfo[0].shippingServiceCost[0].__value__;
              totalPrice = parseFloat(itemPrice) + parseFloat(itemShipPrice);
            }
            else {
              totalPrice = itemPrice;
            }
            if (itemPic !== 'http://thumbs1.ebaystatic.com/pict/04040_0.jpg' && (!(this.in_array(merch, itemName)))) {
              merch.push({pic: itemPic, price: totalPrice, name: itemName,  url: itemUrl, id: itemId});
            }
          });
          this.getProfileMerch(merch);
          return merch;
        }
        else {
          merch = [];
          this.getProfileMerch(merch);
          return merch;
        }
      }, errorCallback => {
        merch = [];
        this.getProfileMerch(merch);
        return merch;
      });
    };

    searchMerch() {
      if (this.categoryName !== this.search) {
        this.merchSort = 'Best Match';
        this.getMerch(this.search, '11450', 1, 'Best Match', []);
      }
    };

    getMoreMerch() {
      this.pageNumber++;
      this.getMerch(this.categoryName, this.categoryId, this.pageNumber, this.merchSort, this.merch);
    };

    sortResults(sortOption) {
      this.merch = [];
      this.getMerch(this.categoryName, this.categoryId, this.pageNumber, sortOption, this.merch);
    };

    setSortValue(sortOption) {
      if (sortOption === 'Best Match') {
        return 'BestMatch';
      }
      else if (sortOption === 'Price (Asc)') {
        return 'PricePlusShippingHighest';
      }
      else if (sortOption === 'Price (Dec)') {
        return 'PricePlusShippingLowest';
      }
    };

    filterResults(val) {
      switch (val) {
        case 'Mens':
          this.categoryId = 15687;
          break;
        case 'Womens':
          this.categoryId = 63869;
          break;
        case 'CDs':
          this.categoryName = 'cd';
          this.categoryId = 176984;
          break;
        case 'Vinyl':
          this.categoryName = 'vinyl';
          this.categoryId = 176985;
          break;
      }
      this.merch = [];
      this.merchSort = 'Best Match';
      this.getMerch(this.categoryName, this.categoryId, this.pageNumber, 'Best Match', this.merch);
    };

    checkMerchPage(val) {
      if (val === 'band tshirt'  || val.indexOf('shirt') > -1 ) {
        this.apparelPage = true;
        this.musicPage = false;
      }
      else if (val === 'cds and vinyl' || val === 'vinyl' || val === 'cd') {
        this.apparelPage = false;
        this.musicPage = true;
      }
      else {
        this.apparelPage = false;
        this.musicPage = false;
      }
    };

    getProfileMerch(merch) {
      if (merch.length !== 0) {
        if (merch.length > 3) {
          this.displayMerch = merch.slice(0, 3);
        }
        else {
          this.displayMerch = merch;
        }
        this.hasMerch = true;
      }
      else {
        this.hasMerch = false;
      }
    };

    in_array(array, name) {
      for (let i = 0; i < array.length; i++) {
          if (array[i].name === name) {
            return true;
          }
      }
      return false;
    }
  }
