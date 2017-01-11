import { Route, RouterModule } from '@angular/router';

import { SearchComponent } from './search.component';

const routes: Route[] = [
  {
    path: '',
    component: SearchComponent,
    children: [
      // { path: 'search', component: SearchComponent }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
