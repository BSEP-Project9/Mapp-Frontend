import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectComponent } from './components/projects/project.component';
import { UserComponent } from './components/user/user.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { LoginComponent } from './components/user/login/login.component';
import { PasswordlessLoginComponent } from './components/user/passwordless-login/passwordless-login.component';
import { LoginRedirectComponent } from './components/user/login-redirect/login-redirect.component';


const routes: Routes = [
  {path: 'admin-profile' , component : ProfileComponent},
  {path: 'all-projects', component : ProjectComponent},
  {path: 'all-users' , component : UserComponent},
  {path: 'login', component: LoginComponent},
  {path: 'passwordless-login', component:PasswordlessLoginComponent},
  {path: 'login-redirect/confirm', component:LoginRedirectComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
