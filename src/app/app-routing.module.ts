import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectComponent } from './components/projects/project.component';
import { UserComponent } from './components/user/user.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { LoginComponent } from './components/user/login/login.component';
import { WorkersByProjectComponent } from './components/contributions/workers-by-project/workers-by-project.component';
import { UserRegisterComponent } from './components/users/user-register/user-register.component';
import { AuthGuard } from './components/user/service/auth/auth-guard.service';
import { PasswordlessLoginComponent } from './components/user/passwordless-login/passwordless-login.component';
import { LoginRedirectComponent } from './components/user/login-redirect/login-redirect.component';
import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { SuccessLoginComponent } from './shared/success-login/success-login.component';
import { AuthGuardService } from './shared/service/auth-guard.service';
import { RegisterAdminComponent } from './components/user/register-admin/register-admin.component';
import { UserActivationComponent } from './components/users/user-activation/user-activation/user-activation.component';


const routes: Routes = [
  {path: 'admin-profile' , component : ProfileComponent, canActivate:[AuthGuard, AuthGuardService]},
  {path: 'all-projects', component : ProjectComponent, canActivate:[AuthGuard, AuthGuardService]},
  {path: 'all-users' , component : UserComponent, canActivate:[AuthGuard, AuthGuardService]},
  {path: 'login', component: LoginComponent},
  {path: 'passwordless-login', component:PasswordlessLoginComponent},
  {path: 'login-redirect/confirm', component:LoginRedirectComponent},
  {path: 'error-page', component: ErrorPageComponent},
  //{path: '**', component:ErrorPageComponent},
  {path: 'success-login', component: SuccessLoginComponent},
  { path: 'register', component: UserRegisterComponent, pathMatch:'full'},
  {path: 'all-projects/project/workers/:id' , component: WorkersByProjectComponent, canActivate: [AuthGuard]},
  {path: 'register-admin', component: RegisterAdminComponent, canActivate: [AuthGuard]},
  {path: 'activation', component: UserActivationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
