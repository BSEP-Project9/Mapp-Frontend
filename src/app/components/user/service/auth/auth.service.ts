import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { Credentials, LoggedUser, PassworldessLogin, UserTokenState } from '../../model/loginDTO.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseApiUrl + '/api/auth';
  private accessToken = localStorage.getItem('jwt');
  private currentRole = localStorage.getItem('role');
  private authenticated = localStorage.getItem('role') ? true : false;
  private nav = new BehaviorSubject<string>(localStorage.getItem('jwt')? 'true': 'false');
  private user: LoggedUser = {} as LoggedUser;
  public currentNav = this.nav.asObservable();
  private currentUserId = Number(localStorage.getItem('id'));

  constructor(private router:Router,
              private http: HttpClient,
              private userService: UserService) { }

  public handleLogin(credentials: Credentials) {
    this.login(credentials).pipe(catchError(()=> {
        alert('Account not activated or does not exist');
        return of()
    }))
        .subscribe((res: UserTokenState) => {

            localStorage.setItem('jwt', res.accessToken);
            this.accessToken = res.accessToken;
          
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

            this.router.navigate(['/admin-profile']);
            return res;
        });
  }

  private login(credentials: Credentials) {
      const headers = new HttpHeaders({'Content-Type': 'application/json'});
      return this.http.post<UserTokenState>(`${this.baseUrl}/login`, JSON.stringify(credentials), { headers: headers })
  }

  public logout():void {
    this.accessToken = null;
    localStorage.removeItem('jwt');
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
    const options = {
      observe: 'response' as const,
      responseType: 'text' as const,
     // withCredentials: true // Dodajte ovo samo ako postoji potreba za slanjem kredencijala (npr. korišćenje sesije)
    };
    //return this.http.get<any>(`${this.baseUrl}/check-email/confirm?token=${token}`, { headers: headers })
    this.http.get(`${this.baseUrl}/check-email/confirm?token=${token}&email=${email}`, options).subscribe(
      response => {
       /* const location = response.headers.get('Authorization');
        if(location !== null){
          console.log(location)
         // window.location.href = location; // Preusmeravanje na dobijeni URL
        }*/
      },
      error => {
        // Obrada greške
      }
    );
  }

  public handleError(error:HttpErrorResponse)
  {
    return throwError(error);
  }

  public getToken(){
    return this.accessToken;
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
}
