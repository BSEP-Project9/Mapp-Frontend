import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { User } from '../../user/model/user.model';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../user/service/user.service';
import { Project } from '../../projects/model/project.model';
import { ContributionService } from '../../contributions/service/contribution.service';

@Component({
  selector: 'app-user-cv',
  templateUrl: './user-cv.component.html',
  styleUrls: ['./user-cv.component.css']
})
export class UserCvComponent implements OnInit {
  id: string = '';
  user: User = {} as User;
  projects: Project[] = [];

  constructor(private location: Location, private route: ActivatedRoute, 
    private userService: UserService, private contributionService: ContributionService) {
   }

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.id = userId;
    }
    
    this.userService.getWorkerById(this.id).subscribe((res: User) => {
      this.user = res;
    });

    this.contributionService.getAllProjectsByWorker(this.id).subscribe((res: Project[]) => {
      this.projects = res;
      console.log(this.projects);
    });

  }

  goBack() {
    this.location.back();
  }

}
