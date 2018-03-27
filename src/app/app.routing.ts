import { Routes } from '@angular/router';
import {
  HomeComponent,
  // UserAddComponent, UserEditComponent, UserSearchComponent,
  MemberComponent
  // , TweepsComponent
} from './index';


export const AppRouts: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  { path: 'home', component: HomeComponent },
  { path: 'members', component: MemberComponent },
  // { path: 'add-auth', component: AddAuthComponent },
  // { path: 'edit-user', component: UserEditComponent },
  // { path: 'search-user', component: UserSearchComponent },
  // { path: 'user-dna', component: AddDNAComponent },
  { path: 'members', component: MemberComponent }, {
    path: '**',
    redirectTo: 'home'
  }
];


