import { Routes } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './guards/auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { ModifyProfileComponent } from './modify-profile/modify-profile.component';
import { AssociationsListComponent } from './associations-list/associations-list.component';
import { AssociationItemComponent } from './association-item/association-item.component';

export const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'users', component: UsersListComponent, canActivate: [authGuard]},
  {path: 'associations', component: AssociationsListComponent, canActivate: [authGuard]},
  {path: 'profile', component: ProfileComponent,canActivate: [authGuard]},
  {path: 'profile/:id', component: ProfileComponent,canActivate: [authGuard]},
  {path: 'modify-profile', component: ModifyProfileComponent,canActivate: [authGuard]},
  {path: 'associations/:id', component: AssociationItemComponent,canActivate: [authGuard]},
  {path: '', redirectTo:'login', pathMatch:'full'},
  {path: '**', component: LoginComponent},
];