import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { Credentials, LoggedUser, PassworldessLogin, PassworldessLoginResponse, UserTokenState } from '../../model/loginDTO.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseApiUrl + '/api/auth';
  private accessToken = localStorage.getItem('accessToken');
  private refreshToken = localStorage.getItem('refreshToken');
  private currentRole = localStorage.getItem('role');
  private authenticated = localStorage.getItem('role') ? true : false;
  private nav = new BehaviorSubject<string>(localStorage.getItem('jwt')? 'true': 'false');
  private user: LoggedUser = {} as LoggedUser;
  public currentNav = this.nav.asObservable();
  private currentUserId = Number(localStorage.getItem('id'));

  private passwordlessLoginResponse: PassworldessLoginResponse = {} as PassworldessLoginResponse;

  constructor(private router:Router,
              private http: HttpClient,
              private userService: UserService) { }

  public handleLogin(credentials: Credentials) {
    this.login(credentials).pipe(catchError(()=> {
        alert('Account not activated or does not exist');
        return of()
    }))
        .subscribe((res: UserTokenState) => {

            localStorage.setItem('accessToken', res.accessToken);
            this.accessToken = res.accessToken;

            localStorage.setItem('refreshToken', res.refreshToken);
            this.refreshToken = res.refreshToken;
          
            let decodedJWT;
            if (this.accessToken != null) {
                decodedJWT = JSON.parse(window.atob(this.accessToken.split('.')[1]));
            }
            
            this.userService.getUserInfoByEmail(decodedJWT.sub).subscribe((response: LoggedUser) => {

              this.user = response;
              console.log(this.user.role)
              localStorage.setItem('role', this.user.role);
              this.currentRole = this.user.role;
              this.authenticated = this.currentRole ? true : false;
        
              localStorage.setItem('id', this.user.id ? this.user.id.toString() : '-1');
              this.currentUserId = Number(this.user.id);

              this.nav.next('true');
            });

            this.router.navigate(['/success-login'])
            return res;
        });
  }

  private login(credentials: Credentials) {
      const headers = new HttpHeaders({'Content-Type': 'application/json'});
      return this.http.post<UserTokenState>(`${this.baseUrl}/login`, JSON.stringify(credentials), { headers: headers })
  }

  public logout():void {
    this.accessToken = null;
    this.refreshToken = null;
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('role');
    localStorage.clear();
    this.nav.next('false');
    this.router.navigate(['']);
  }
  
  public handlePasswordlessLogin(credential: PassworldessLogin):Observable<any>{
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<any>(`${this.baseUrl}/email-login`, JSON.stringify(credential), { headers: headers })
  }

  public confirmEmailLogin(token:string, email:string){
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    this.http.get<PassworldessLoginResponse>(`${this.baseUrl}/check-email/confirm?token=${token}&email=${email}`).
    subscribe(
    data => {
        this.passwordlessLoginResponse = data;
            localStorage.setItem('jwt', data.accessToken);
            this.accessToken = data.accessToken;
          
            let decodedJWT;
            if (this.accessToken != null) {
                decodedJWT = JSON.parse(window.atob(this.accessToken.split('.')[1]));
            }
            this.userService.getUserInfoByEmail(decodedJWT.sub).subscribe((response: LoggedUser) => {

              this.user = response;
              console.log(this.user.role)
              localStorage.setItem('role', this.user.role);
              this.currentRole = this.user.role;
              this.authenticated = this.currentRole ? true : false;
        
              localStorage.setItem('id', this.user.id ? this.user.id.toString() : '-1');
              this.currentUserId = Number(this.user.id);

              this.nav.next('true');
            });
        
            this.router.navigate(['/success-login'])
      },
      error =>{
        window.location.href = "http://localhost:4200/error-page"
      }
      
    );
  }

  public updateAccessToken() {
    const headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${this.getAccessToken()}`});
    console.log('generating new access token');
    return this.http.post<UserTokenState>(`${this.baseUrl}/refresh-token`, { headers: headers });
  }

  public saveTokens(data: UserTokenState) {
    this.accessToken = data.accessToken;
    localStorage.setItem('accessToken', this.accessToken);

  }

  public handleError(error:HttpErrorResponse)
  {
    return throwError(error);
  }

  public getAccessToken(){
    return this.accessToken;
  }

  public getRefreshToken(){
    return this.refreshToken;
  }

  public getRole(){
    return this.currentRole;
  }

  public getUserId(){
    return this.currentUserId;
  }

  public isAuthenticated(){
    return this.authenticated;
  }

  public setAccessToken(accessToken: string) {
    localStorage.setItem('accessToken', accessToken);
    this.accessToken = accessToken;
  }

}
