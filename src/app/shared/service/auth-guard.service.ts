import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/components/user/service/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private authService: AuthService,
    private router:Router) { }

    canActivate(): boolean{
      if(!this.authService.isAuthenticated()){
        this.router.navigate(['/error-page']);
        return false;
      }
        return true;
    }
}
