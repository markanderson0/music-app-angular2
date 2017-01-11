import { Route, RouterModule } from '@angular/router';

import { TicketsComponent } from './tickets.component';
import{ TopTicketsComponent } from './top-tickets';
import{ TicketsGenreComponent } from './tickets-genre';
import{ TicketsSearchComponent } from './tickets-search';

const routes: Route[] = [
  {
    path: '',
    component: TicketsComponent,
    children: [
      // { path: '', redirectTo: 'settings', pathMatch: 'full' },
      { path: '', component: TopTicketsComponent },
      { path: 'genre/:genre', component: TicketsGenreComponent },
      { path: 'artist/:artist', component: TicketsSearchComponent },
      { path: 'search', component: TicketsSearchComponent }
    ]
  }
];

export const routedComponents = [TicketsComponent, TopTicketsComponent, TicketsGenreComponent, TicketsSearchComponent];
export const routing = RouterModule.forChild(routes);
