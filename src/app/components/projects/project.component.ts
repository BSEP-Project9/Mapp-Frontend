import { Component, OnInit } from '@angular/core';
import { Project } from './model/project.model';
import { ProjectService } from './service/project.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { User, UserDto } from '../user/model/user.model';
import { UserService } from '../user/service/user.service';
import { AuthService } from '../user/service/auth/auth.service';
import { ContributionService } from '../contributions/service/contribution.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  public projects : any[] = [];
  public users : User[] = [];
  public project : Project = {} as Project;
  selectedWorker: number = 0;
  errorMessage = "";
  public role = '';

  constructor(private projectService : ProjectService, private route: ActivatedRoute, private userService : UserService, private router : Router, private authService: AuthService, private contributionService: ContributionService) { }

  ngOnInit(): void {
    this.role = '';
    this.authService.currentNav.subscribe(message =>{
      const role = this.authService.getRole();
      console.log("**** navbar:"+ role)
      this.role = role ? role : '';
      console.log(this.role)
      if (role === "ROLE_ADMIN") {
        this.projectService.getProjects().subscribe(res =>{
          this.projects = res;
        })
      }
      if (role === "ROLE_PM") {
        let user;
        this.contributionService.getProjectsForUser(this.authService.getUserId()).subscribe(res =>{
          this.projects = res;
        })
      }
    })
    
    this.userService.getUsers().subscribe(res =>{
      this.users = res;
    })
  }

  createProject() {
    this.errorMessage = "";

    this.projectService.createProject(this.project).subscribe(
      data => {
        console.log(data);
        this.projects.push(this.project);
    }, error => {
      console.log(error);
      this.errorMessage = error.message;

    })
  }

}
