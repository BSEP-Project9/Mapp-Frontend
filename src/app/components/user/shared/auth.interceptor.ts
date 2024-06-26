import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../service/auth/auth.service';
import { UserTokenState } from '../model/loginDTO.model';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;

  constructor(public auth:AuthService) {}
  public jwtHelper: JwtHelperService = new JwtHelperService();

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
    let token: string | null = localStorage.getItem("accessToken");
    
    if (token) {
        request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
    }

    if (token && this.jwtHelper.isTokenExpired(token)) {
      request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + localStorage.getItem("refreshToken"))});
    }

    return next.handle(request);
  }

}
