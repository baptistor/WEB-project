import { Routes } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './guards/auth.guard';
import { ProfileComponent } from './profile/profile.component';

export const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'users', component: UsersListComponent,canActivate: [authGuard]},
  {path: '', redirectTo:'login', pathMatch:'full'},
  {path: 'profile', component: ProfileComponent,canActivate: [authGuard]}
];