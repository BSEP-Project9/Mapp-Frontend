import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { User } from '../../user/model/user.model';
import { Contribution, ProjectContributionDto } from '../model/contribution.model';

@Injectable({
  providedIn: 'root'
})
export class ContributionService {
  
  private baseApiUrl: string = environment.baseApiUrl + '/api/contributions';
  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  getUsersForProject(projectId: number): Observable<User[]> {
    const url = `${this.baseApiUrl}/worker/project/${projectId}`;
    return this.http.get<User[]>(url);
  }

  addWorkersToProject(payload : any) : Observable<void> {
    return this.http.post<void>(`${this.baseApiUrl}/workers-to-project`,JSON.stringify(payload), { headers: this.headers });
  }

  getProjectsForUser(userId: number): Observable<ProjectContributionDto[]> {
    const url = `${this.baseApiUrl}/project/worker/${userId}`;
    return this.http.get<ProjectContributionDto[]>(url);
  }

  removeWorkerFromProject(workerId : number, projectId: number) : Observable<void> {
    return this.http.delete<void>(`${this.baseApiUrl}/workers-from-project/${workerId}/${projectId}`, { headers: this.headers });
  }
}
