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

  /**
   * Returns a list of merch containing its picture, price, name, url, and id.
   * Search for merch items using the eBay search api, filtering the results
   * so that items with the default eBay image (i.e. no image has been uplaoded for
   * the product) and duplicate items are not added to the list of merch items.
   * The price that is added to the merch list is the price of the item plus the
   * shipping cost for the item.
   * 
   * @param name: category name
   * @param categoryId: category id
   * @param pageNum: page number
   * @param sort: sort order
   * @param merch: list of merch
   * @return a list of merch containing its picture, price, name, url, and id
   */
  getMerch(name, categoryId, pageNum, sort, merch): Promise<any[]> {
      this.merch = merch;
      this.categoryName = name;
      this.categoryId = categoryId;
      if (sort === undefined) {
        this.merchSort = 'Best Match';
        this.sortValue = 'BestMatch';
      } else {
        this.merchSort = sort;
        this.sortValue = this.setSortValue(sort);
      }
      if (merch === undefined) {
        this.merch = [];
      } else {
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
            let itemPrice = item.sellingStatus[0].convertedCurrentPrice[0].__value__;
            if (item.shippingInfo[0].hasOwnProperty('shippingServiceCost')) {
              let itemShipPrice = item.shippingInfo[0].shippingServiceCost[0].__value__;
              totalPrice = parseFloat(itemPrice) + parseFloat(itemShipPrice);
            } else {
              totalPrice = itemPrice;
            }
            if (item.hasOwnProperty('galleryURL')) {
              itemPic = item.galleryURL[0];
            }
            if (itemPic !== 'http://thumbs1.ebaystatic.com/pict/04040_0.jpg' && (!(this.in_array(merch, itemName)))) {
              merch.push({pic: itemPic, price: totalPrice, name: itemName,  url: itemUrl, id: itemId});
            }
          });
          this.getProfileMerch(merch);
          return merch;
        } else {
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

    /**
     * Increments the page number and calls getMerch with the new page number.
     */
    getMoreMerch() {
      this.pageNumber++;
      this.getMerch(this.categoryName, this.categoryId, this.pageNumber, this.merchSort, this.merch);
    };

    /**
     * Resets the merch list and calls getMerch with the selected sort option.
     * 
     * @param sortOption: name of the sort option
     */
    sortResults(sortOption) {
      this.merch = [];
      this.getMerch(this.categoryName, this.categoryId, this.pageNumber, sortOption, this.merch);
    };

    /**
     * Takes the sortOption and returns the corresponding name to comply
     * with the eBay api.
     * 
     * @param sortOption: name of the sort option
     * @return the name of the sort option to comply with the eBay api
     */
    setSortValue(sortOption) {
      if (sortOption === 'Best Match') {
        return 'BestMatch';
      } else if (sortOption === 'Price (Asc)') {
        return 'PricePlusShippingHighest';
      } else if (sortOption === 'Price (Dec)') {
        return 'PricePlusShippingLowest';
      }
    };

    /**
     * Resets the merch list and calls getMerch with the category id that
     * corresponds to the filterName.
     * 
     * @param filterName: name of the filter to apply
     */
    filterResults(filterName) {
      switch (filterName) {
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

    /**
     * Determines what filter buttons to show depending on what page has
     * been selected.
     * 
     * @param category: the name of the selected category
     */
    checkMerchPage(category) {
      if (category === 'band tshirt'  || category.indexOf('shirt') > -1 ) {
        this.apparelPage = true;
        this.musicPage = false;
      } else if (category === 'cds and vinyl' || category === 'vinyl' || category === 'cd') {
        this.apparelPage = false;
        this.musicPage = true;
      } else {
        this.apparelPage = false;
        this.musicPage = false;
      }
    };

    /**
     * Assigns variables for displaying merch on the artists profile page.
     * 
     * If the artist has more than 3 merch items only display the first 3 and 
     * if the artist has no merch items set the hasMerch boolean to false to 
     * display that the artist has no merch.
     * 
     * @param merch: list of merch
     */
    getProfileMerch(merch) {
      if (merch.length !== 0) {
        if (merch.length > 3) {
          this.displayMerch = merch.slice(0, 3);
        } else {
          this.displayMerch = merch;
        }
        this.hasMerch = true;
      } else {
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
