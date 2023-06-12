import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { User } from '../../user/model/user.model';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../user/service/user.service';

@Component({
  selector: 'app-user-cv',
  templateUrl: './user-cv.component.html',
  styleUrls: ['./user-cv.component.css']
})
export class UserCvComponent implements OnInit {
  id: string = '';
  user: User = {} as User;

  constructor(private location: Location, private route: ActivatedRoute, private userService: UserService) {
   }

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.id = userId;
    }
    
    this.userService.getWorkerById(this.id).subscribe((res: User) => {
      this.user = res;
    });

  }

  goBack() {
    this.location.back();
  }

}
