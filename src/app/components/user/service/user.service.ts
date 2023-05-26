import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User, UserDto } from '../model/user.model';
import { LoggedUser } from '../model/loginDTO.model';


@Injectable({
  providedIn: 'root'
})

export class UserService {
  
  private baseApiUrl: string = environment.baseApiUrl + '/api/users';
  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });


  constructor(private http: HttpClient) { }

   getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseApiUrl, {headers: this.headers});
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
}
