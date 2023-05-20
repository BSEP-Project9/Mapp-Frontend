import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectComponent } from './components/projects/project.component';
import { UserComponent } from './components/user/user.component';
import { ProfileComponent } from './components/user/profile/profile.component';


const routes: Routes = [
  {path: 'admin-profile' , component : ProfileComponent},
  {path: 'all-projects', component : ProjectComponent},
  {path: 'all-users' , component : UserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
