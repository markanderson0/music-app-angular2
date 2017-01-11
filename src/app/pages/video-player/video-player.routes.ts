import { Route, RouterModule } from '@angular/router';

import { VideoPlayerComponent } from './video-player.component';


const routes: Route[] = [
  {
    path: ':artist/:show/:playlist/:id',
    component: VideoPlayerComponent,
    children: [
    ]
  }
];

export const routing = RouterModule.forChild(routes);
