import { Route, RouterModule } from '@angular/router';

import { ArtistComponent } from './artist.component';
import { ArtistProfileComponent } from './artist-profile';
import { ArtistAlbumsComponent } from './artist-albums';
import { ArtistShowsComponent } from './artist-shows';
import { ArtistVideosComponent } from './artist-videos';

const routes: Route[] = [
  {
    path: ':artist',
    component: ArtistComponent,
    children: [
      { path: 'profile', component: ArtistProfileComponent },
      { path: 'albums', component: ArtistAlbumsComponent },
      { path: 'shows', component: ArtistShowsComponent },
      { path: 'videos', component: ArtistVideosComponent }
    ]
  }
];

export const routedComponents = [ArtistComponent, ArtistProfileComponent, ArtistAlbumsComponent, ArtistShowsComponent, ArtistVideosComponent];
export const routing = RouterModule.forChild(routes);
