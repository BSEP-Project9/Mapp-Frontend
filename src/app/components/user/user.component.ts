import { Component, OnInit } from '@angular/core';
import { User } from './model/user.model';
import { UserService } from './service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  public users : User[] = [];
  
  constructor(private userService : UserService, private router : Router) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(res =>{
      this.users = res;
    })
  }

  block(email: string) {
    this.userService.block(email).subscribe(data => console.log(data));
  }

  unblock(email: string) {
    this.userService.unblock(email).subscribe(data => console.log(data));
  }
 
  }

