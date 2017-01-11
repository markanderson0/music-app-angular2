import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MerchProductService } from './merch-product.service';

@Component({
  selector: 'merch-product',
  templateUrl: 'merch-product.component.html',
  styleUrls: ['./merch-product.component.scss'],
  providers: [MerchProductService]
})
export class MerchProductComponent implements OnInit {

  id: string;
  selectedMerch = this.merchProductService.selectedMerch;
  merchQuantity = this.merchProductService.merchQuantity;
  merchSize = this.merchProductService.merchSize;
  merchPurchaseDetails = this.merchProductService.merchPurchaseDetails;
  quantity = this.merchProductService.quantity;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private merchProductService: MerchProductService
  ) {  }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      this.id = params['id'];
      this.merchProductService.getMerchItem(this.id)
      .then(merchProduct => {
        if (this.selectedMerch.length === 0 || this.selectedMerch['name'] !== merchProduct[0][0].name) {
          this.selectedMerch = merchProduct[0][0];
        }
      });
    });

   }

}
