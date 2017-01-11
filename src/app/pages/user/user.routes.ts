import { Route, RouterModule } from '@angular/router';

import { UserComponent } from './user.component';
import { ProfileComponent } from './profile';
import { FollowingComponent } from './following';
import { UploadComponent } from './upload';
import { SettingsComponent } from './settings';

const routes: Route[] = [
  {
    path: '',
    component: UserComponent,
    children: [
      // { path: '', redirectTo: 'settings', pathMatch: 'full' },
      { path: 'profile', component: ProfileComponent },
      { path: 'following', component: FollowingComponent },
      { path: 'upload', component: UploadComponent },
      { path: 'settings', component: SettingsComponent }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
