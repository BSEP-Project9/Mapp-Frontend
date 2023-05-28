import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { UserTokenState } from '../../model/loginDTO.model';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    public jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private router: Router, private http: HttpClient) {
  }
  async canActivate() {
    const token = localStorage.getItem("accessToken");

    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }

    const isRefreshSuccess = await this.refreshingTokens(token);
    if (!isRefreshSuccess) {
      this.router.navigate(["login"]);
    }

    return isRefreshSuccess;
  }

  private async refreshingTokens(token: string | null): Promise<boolean> {
    const refreshToken: string | null = localStorage.getItem("refreshToken");

    if (!token || !refreshToken) {
      return false;
    }

    let isRefreshSuccess: boolean;
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      console.log('Refresh token: ' + refreshToken);
      let header = new HttpHeaders().set(
        'Authorization',
        'Bearer ' + refreshToken
      );

      await this.http.post(environment.baseApiUrl + '/api/auth/refresh-token', header).subscribe((res: any) => {
        const newToken = res.accessToken;
        console.log(newToken);
        localStorage.setItem("accessToken", newToken);
        isRefreshSuccess = true;
      });
      isRefreshSuccess = true;
    }
    catch (ex) {
      isRefreshSuccess = false;
    }
    return isRefreshSuccess;
  }

}