import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../model/project.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../../user/model/user.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private baseApiUrl: string = environment.baseApiUrl + '/api/projects';
  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.baseApiUrl, {headers: this.headers});
  }

  createProject(project : Project) : Observable<Project> {
    return this.http.post<Project>(`${this.baseApiUrl}`,JSON.stringify(project), { headers: this.headers });
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseApiUrl, {headers: this.headers});
  }
}


