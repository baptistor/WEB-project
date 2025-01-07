import { Routes } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './guards/auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { ModifyProfileComponent } from './modify-profile/modify-profile.component';
import { RegistrationComponent } from './registration/registration.component';
import { notAuthGuard } from './guards/not-auth.guard';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { AssociationsListComponent } from './associations-list/associations-list.component';

export const routes: Routes = [
  {path: 'login/:from', component: LoginComponent,canActivate: [notAuthGuard]},
  {path: 'login', component: LoginComponent,canActivate: [notAuthGuard]},
  {path: 'users', component: UsersListComponent, canActivate: [authGuard]},
  {path: 'associations', component: AssociationsListComponent, canActivate: [authGuard]},
  {path: '', redirectTo:'login', pathMatch:'full'},
  {path: 'profile', component: ProfileComponent,canActivate: [authGuard]},
  {path: 'modify-profile', component: ModifyProfileComponent,canActivate: [authGuard]},
  {path: 'registration', component: RegistrationComponent,canActivate: [notAuthGuard]},
  {path: 'delete-user', component: DeleteUserComponent,canActivate: [authGuard]},
];