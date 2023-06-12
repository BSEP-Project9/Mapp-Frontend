import { Component, OnInit } from '@angular/core';
import { User } from '../user/model/user.model';
import { UserService } from '../user/service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[] = [];
  displayedColumns: string[] = ['id', 'name', 'surname', 'email', 'actions'];

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('role') === 'ROLE_HR') {
      this.userService.getWorkers().subscribe((res: User[]) => {
        this.users = res;
      });
    } else if (localStorage.getItem('role') === 'ROLE_PM') {
      const id = localStorage.getItem('id');
      if (id) {
        this.userService.getEmployeesManagedByPM(id).subscribe((res: User[]) => {
          this.users = res;
        });
      }

    }

  }

  view(id: string) {
    this.router.navigate(['user-cv', id]);
  }

}
