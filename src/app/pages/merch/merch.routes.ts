import { Route, RouterModule } from '@angular/router';

import { MerchComponent } from './merch.component';
import { MerchListComponent } from './merch-list';
import { MerchProductComponent } from './merch-product';

const routes: Route[] = [
  {
    path: '',
    component: MerchComponent,
    children: [
      // { path: '', redirectTo: 'settings', pathMatch: 'full' },
      { path: '' },
      { path: 'category/:category', component: MerchListComponent },
      { path: 'search', component: MerchListComponent },
      { path: 'product/:id', component: MerchProductComponent }
    ]
  }
];

export const routedComponents = [MerchComponent, MerchListComponent, MerchProductComponent];
export const routing = RouterModule.forChild(routes);
