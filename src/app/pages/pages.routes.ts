import { Routes, RouterModule }  from '@angular/router';
import { PagesComponent } from './pages.component';
// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: '', loadChildren: () =>  require('es6-promise-loader!./home/home.module')('HomeModule') },
      { path: 'profile', loadChildren: () =>  require('es6-promise-loader!./user/user.module')('UserModule') },
      { path: 'tickets', loadChildren: () =>  require('es6-promise-loader!./tickets/tickets.module')('TicketsModule') },
      { path: 'merch', loadChildren: () =>  require('es6-promise-loader!./merch/merch.module')('MerchModule') },
      { path: 'search', loadChildren: () =>  require('es6-promise-loader!./search/search.module')('SearchModule') },
      { path: 'browse', loadChildren: () =>  require('es6-promise-loader!./browse/browse.module')('BrowseModule') },
      { path: 'artist', loadChildren: () =>  require('es6-promise-loader!./artist/artist.module')('ArtistModule') },
      { path: 'video', loadChildren: () => require('es6-promise-loader!./video-player/video-player.module')('VideoPlayerModule') }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
