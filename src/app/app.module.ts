import { NgModule, forwardRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar/navbar.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { HttpClientModule } from '@angular/common/http';
import { ProjectComponent } from './components/projects/project.component';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { UserComponent } from './components/user/user.component';
import { LoginComponent } from './components/user/login/login.component';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './components/user/shared/auth.interceptor';
import { PasswordlessLoginComponent } from './components/user/passwordless-login/passwordless-login.component';
import { LoginRedirectComponent } from './components/user/login-redirect/login-redirect.component';
import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { SuccessLoginComponent } from './shared/success-login/success-login.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProfileComponent,
    ProjectComponent,
    UserComponent,
    LoginComponent,
    PasswordlessLoginComponent,
    LoginRedirectComponent,
    ErrorPageComponent,
    SuccessLoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
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
