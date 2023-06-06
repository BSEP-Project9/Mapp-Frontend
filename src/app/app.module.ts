import { NgModule, forwardRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserRegisterComponent } from './components/users/user-register/user-register.component';
import { UsersComponent } from './components/users/users.component';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { NavbarComponent } from './navbar/navbar/navbar.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { ProjectComponent } from './components/projects/project.component';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { UserComponent } from './components/user/user.component';
import { LoginComponent } from './components/user/login/login.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './components/user/shared/auth.interceptor';
import { UserActivationComponent } from './components/users/user-activation/user-activation/user-activation.component';
import { ContributionComponent } from './components/contributions/contribution.component';
import { WorkersByProjectComponent } from './components/contributions/workers-by-project/workers-by-project.component';
import { AuthGuard } from './components/user/service/auth/auth-guard.service';
import { RegisterAdminComponent } from './components/user/register-admin/register-admin.component';
import { EngineersComponent } from './components/users/engineers/engineers/engineers.component';


@NgModule({
  declarations: [
    AppComponent,
    UserRegisterComponent,
    UsersComponent,
    NavbarComponent,
    ProfileComponent,
    ProjectComponent,
    UserComponent,
    LoginComponent,
    UserActivationComponent,
    ContributionComponent,
    WorkersByProjectComponent,
    RegisterAdminComponent,
    EngineersComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    FormsModule
    ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LoginComponent),
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
