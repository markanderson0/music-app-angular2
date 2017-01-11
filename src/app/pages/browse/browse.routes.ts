import { Route, RouterModule } from '@angular/router';

import { BrowseComponent } from './browse.component';
import { BrowseNavigationComponent } from './browse-navigation';
import { BrowseGenreComponent } from './browse-genre';

const routes: Route[] = [
  {
    path: '',
    component: BrowseComponent,
    children: [
      { path: '', component: BrowseNavigationComponent },
      { path: 'genre/:genre', component: BrowseGenreComponent }
    ]
  }
];

export const routedComponents = [BrowseComponent, BrowseNavigationComponent, BrowseGenreComponent];
export const routing = RouterModule.forChild(routes);
