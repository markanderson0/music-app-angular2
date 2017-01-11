import { Route, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';

const routes: Route[] = [
  {
    path: '',
    component: HomeComponent,
    children: [
    ]
  }
];

export const routing = RouterModule.forChild(routes);
