import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectComponent } from './components/projects/project.component';
import { UserComponent } from './components/user/user.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { LoginComponent } from './components/user/login/login.component';
import { UserRegisterComponent } from './components/users/user-register/user-register.component';

const routes: Routes = [
  { path: 'register', component: UserRegisterComponent, pathMatch:'full'},
  {path: 'admin-profile' , component : ProfileComponent},
  {path: 'all-projects', component : ProjectComponent},
  {path: 'all-users' , component : UserComponent},
  {path: 'login', component: LoginComponent}

]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
