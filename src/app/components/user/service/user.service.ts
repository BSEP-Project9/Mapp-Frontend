import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AdminDTO, Skills, User, UserDto } from '../model/user.model';
import { LoggedUser } from '../model/loginDTO.model';


@Injectable({
  providedIn: 'root'
})

export class UserService {
  
  private baseApiUrl: string = environment.baseApiUrl + '/api/users';
  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });


  constructor(private http: HttpClient) { }

   getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseApiUrl}/all`, {headers: this.headers});
  }

  public getUserById(id: number):Observable<UserDto>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.get<UserDto>(`${this.baseApiUrl}/${id}`, {headers: headers});
  }

  public getUserInfoByEmail(email:string):Observable<LoggedUser>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.get<LoggedUser>(`${this.baseApiUrl}/email/${email}`, {headers: headers});
  }

  edit(payload : any) : Observable<void> {
    return this.http.put<void>(`${this.baseApiUrl}`,JSON.stringify(payload), { headers: this.headers });
  }
  
  editPassword(payload : any) : Observable<void> {
    return this.http.put<void>(`${this.baseApiUrl}/pswd`,JSON.stringify(payload), { headers: this.headers });
  }

  block(email : any) : Observable<void> {
    return this.http.put<void>(`${this.baseApiUrl}/block/${email}`, [], { headers: this.headers });
  }

  unblock(email : any) : Observable<void> {
    return this.http.put<void>(`${this.baseApiUrl}/unblock/${email}`, [], { headers: this.headers });
  }

  public registerAdmin(adminDto: any): Observable<any> {
    return this.http.post<any>(`${this.baseApiUrl}/register-admin`,JSON.stringify(adminDto) ,{headers: this.headers} )
  }

  public addSkill(skills : Skills, userId : number): Observable<any> {
    return this.http.post<any>(`${this.baseApiUrl}/${userId}/add-skill`,JSON.stringify(skills) ,{headers: this.headers} )
  }


}
