import { Component, OnInit } from '@angular/core';
import { Project } from './model/project.model';
import { ProjectService } from './service/project.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  public projects : Project[] = [];
  public project : Project = {} as Project;

  errorMessage = "";

  constructor(private projectService : ProjectService, private router : Router) { }

  ngOnInit(): void {
    this.projectService.getProjects().subscribe(res =>{
      this.projects = res;
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
