import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';

@Injectable()
export class MerchProductService {

  merchQuantity = '1,2,3,4,5';
  merchSize = 'S,M,L,XL,XXL';
  merchPurchaseDetails = {};
  quantity = '1';
  selectedMerch = [];

  apiKey: string = 'XXXXX';

  constructor(private http: Http) { }

  /**
   * Calls the eBay api to get the name, url, picture, and the price of the merch product.
   * 
   * If the item has any shipping costs they are added to the price.
   * 
   * @param id: id of the merch product
   * @return the name, url, picture, and the price of the merch product
   */
  getMerchItem(id): Promise<any[]> {
    this.selectedMerch = [];
    let params = new URLSearchParams();
    params.set('OPERATION-NAME', 'findItemsAdvanced');
    params.set('SERVICE-VERSION', '1.0.0');
    params.set('SECURITY-APPNAME', this.apiKey);
    params.set('RESPONSE-DATA-FORMAT', 'JSON');
    params.set('keywords', id);
    params.set('paginationInput.entriesPerPage', '1');
    return this.http.get('http://svcs.ebay.com/services/search/FindingService/v1', { search: params })
    .toPromise()
    .then((response: Response) => {
      return response.json().findItemsAdvancedResponse[0].searchResult[0].item.map(item => {
          let itemTitle = item.title[0];
          let itemUrl = item.viewItemURL[0];
          let itemPic = item.galleryURL[0];
          let itemSellPrice = item.sellingStatus[0].convertedCurrentPrice[0].__value__;
          let itemPrice = 0;
          if (item.shippingInfo[0].hasOwnProperty('shippingServiceCost')) {
            let itemShipPrice = item.shippingInfo[0].shippingServiceCost[0].__value__;
            itemPrice = parseFloat(itemSellPrice) + parseFloat(itemShipPrice);
          } else {
            itemPrice = itemSellPrice;
          }
          this.selectedMerch.push({name: itemTitle, url: itemUrl, pic: itemPic, price: itemPrice });
          return this.selectedMerch;
      });
    });
  }

  /**
   * Sets the merch product.
   * 
   * @param name: name of the merch product
   * @param price: price of the merch product
   * @param url: link to the merch product
   * @param pic: picture of the merch product
   */
  setMerchItem(name, price, url, pic) {
    this.selectedMerch = [{name: name, url: url, pic: pic, price: price}];
  }

}
