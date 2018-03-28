import { Routes } from '@angular/router';
import {
  HomeComponent,
  // UserAddComponent, UserEditComponent, UserSearchComponent,
  MemberComponent, TweetComponent, RegisterComponent
  , AccountSettingComponent
} from './index';


export const AppRouts: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  { path: 'home', component: HomeComponent },
  { path: 'members', component: MemberComponent },
  { path: 'viewTweet', component: TweetComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'setting', component: AccountSettingComponent }, {
    path: '**',
    redirectTo: 'home'
  }
];


