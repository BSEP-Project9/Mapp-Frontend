import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectComponent } from './components/projects/project.component';
import { UserComponent } from './components/user/user.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { LoginComponent } from './components/user/login/login.component';
import { WorkersByProjectComponent } from './components/contributions/workers-by-project/workers-by-project.component';
import { UserRegisterComponent } from './components/users/user-register/user-register.component';
import { AuthGuard } from './components/user/service/auth/auth-guard.service';
import { RegisterAdminComponent } from './components/user/register-admin/register-admin.component';
import { UserActivationComponent } from './components/users/user-activation/user-activation/user-activation.component';
import { EngineersComponent } from './components/users/engineers/engineers/engineers.component';



const routes: Routes = [
  { path: 'register', component: UserRegisterComponent, pathMatch:'full'},
  {path: 'admin-profile' , component : ProfileComponent, canActivate: [AuthGuard]},
  {path: 'all-projects', component : ProjectComponent, canActivate: [AuthGuard]},
  {path: 'all-users' , component : UserComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'all-projects/project/workers/:id' , component: WorkersByProjectComponent, canActivate: [AuthGuard]},
  {path: 'register-admin', component: RegisterAdminComponent, canActivate: [AuthGuard]},
  {path: 'activation', component: UserActivationComponent},
  {path: 'all-engineers', component: EngineersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
