import { Component, OnInit } from '@angular/core';
import { Contribution } from '../model/contribution.model';
import { ContributionService } from '../service/contribution.service';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../../projects/model/project.model';
import { User } from '../../user/model/user.model';
import { UserService } from '../../user/service/user.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-workers-by-project',
  templateUrl: './workers-by-project.component.html',
  styleUrls: ['./workers-by-project.component.css']
})
export class WorkersByProjectComponent implements OnInit {

  public projectId: number = 0;
  public users : User[] = [];
  public selectUsers : User[] = [];
  public project : Project = {} as Project ;  
  public selectedWorker: number = 0; 
  errorMessage = "";

  constructor(private http: HttpClient, private route: ActivatedRoute, private userService: UserService, private contributionService: ContributionService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.projectId = Number(params.get('id'));
  if (this.projectId) {
    this.loadUsers();
      }
    });
  }

  loadUsers (): void {
    this.contributionService.getUsersForProject(this.projectId).subscribe(users => {
        this.users = users;
    });
    this.userService.getUsers().subscribe(res =>{
      this.selectUsers = res;
      this.filterUsers();
    });
    
  }
 
  filterUsers () {
    const usersOnProject: number[] = [];
    this.users.forEach(u => usersOnProject.push(u.id)); // sad imam listu 3 i 4
    this.selectUsers = this.selectUsers.filter(u => {
      let exist = false;
      let isAdmin = false;
      let isPM = false;
      usersOnProject.forEach(uop => {
        if (uop === u.id) exist = true;
      })
      if (u.role.name === "ROLE_ADMIN") isAdmin = true;
      if (u.role.name === "ROLE_HR") isPM = true;
      return !exist && !isAdmin && !isPM;
    })
  }

  addWorkerToProject () {
    const workerIds: number[] = [];
    workerIds.push(this.selectedWorker);
    alert(this.selectedWorker);
    const payload = {
      projectId: this.projectId,
      employeeIds: workerIds
    };
    this.contributionService.addWorkersToProject(payload).subscribe(data => console.log(data));
    
    // window.location.reload();
  }

  removeWorkerToProject (userId: number) {
    this.contributionService.removeWorkerFromProject(userId, this.projectId).subscribe(data => console.log(data));
    alert("This user is removed from project" );
    
    // window.location.reload();
  }

}
