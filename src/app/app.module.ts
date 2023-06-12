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
import { PasswordlessLoginComponent } from './components/user/passwordless-login/passwordless-login.component';
import { LoginRedirectComponent } from './components/user/login-redirect/login-redirect.component';
import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { SuccessLoginComponent } from './shared/success-login/success-login.component';
import { UserActivationComponent } from './components/users/user-activation/user-activation/user-activation.component';
import { ContributionComponent } from './components/contributions/contribution.component';
import { WorkersByProjectComponent } from './components/contributions/workers-by-project/workers-by-project.component';
import { AuthGuard } from './components/user/service/auth/auth-guard.service';
import { RegisterAdminComponent } from './components/user/register-admin/register-admin.component';
import {MatTableModule} from '@angular/material/table';
import { UserCvComponent } from './components/users/user-cv/user-cv.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';

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
    PasswordlessLoginComponent,
    LoginRedirectComponent,
    ErrorPageComponent,
    SuccessLoginComponent,
    UserActivationComponent,
    ContributionComponent,
    WorkersByProjectComponent,
    RegisterAdminComponent,
    UserCvComponent

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
    FormsModule,
    MatTableModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatNativeDateModule
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
