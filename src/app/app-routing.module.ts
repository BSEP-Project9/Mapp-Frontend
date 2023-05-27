import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectComponent } from './components/projects/project.component';
import { UserComponent } from './components/user/user.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { LoginComponent } from './components/user/login/login.component';
import { PasswordlessLoginComponent } from './components/user/passwordless-login/passwordless-login.component';
import { LoginRedirectComponent } from './components/user/login-redirect/login-redirect.component';
import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { SuccessLoginComponent } from './shared/success-login/success-login.component';
import { AuthGuardService as AuthGuard } from './shared/service/auth-guard.service';


const routes: Routes = [
  {path: 'admin-profile' , component : ProfileComponent, canActivate:[AuthGuard]},
  {path: 'all-projects', component : ProjectComponent, canActivate:[AuthGuard]},
  {path: 'all-users' , component : UserComponent, canActivate:[AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'passwordless-login', component:PasswordlessLoginComponent},
  {path: 'login-redirect/confirm', component:LoginRedirectComponent},
  {path: 'error-page', component: ErrorPageComponent},
  //{path: '**', component:ErrorPageComponent},
  {path: 'success-login', component: SuccessLoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
