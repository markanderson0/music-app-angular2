import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MerchNavigationService } from './merch-navigation.service';

@Component({
  selector: 'merch',
  templateUrl: 'merch.component.html',
  styleUrls: ['./merch.component.scss'],
  providers: [MerchNavigationService]
})
export class MerchComponent implements OnInit {

  categories: any[];
  isCollapsed: boolean = true;
  searchTerm: string;

  constructor(private router: Router, private merchNavigationService: MerchNavigationService) {
    this.categories = merchNavigationService.getMerchCategories();
   }

  ngOnInit() { }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }

  search() {
    this.router.navigate(['merch/search', { query: this.searchTerm }]);
  }

  openTopMerch() {
    this.router.navigate(['/merch']);
  }

  openMerchCategory(category: string) {
    this.router.navigate(['merch/category', category]);
  }
}
