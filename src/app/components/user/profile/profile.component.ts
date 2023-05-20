import { Component, OnInit } from '@angular/core';
import { Address, User } from '../model/user.model';
import { UserService } from '../service/user.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  
  public user : User = {} as User;
  public address : Address = {} as Address;
  isEditMode: boolean = false;

  constructor(private userService : UserService, private router : Router, private route: ActivatedRoute) { }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
    if (!this.isEditMode) {
      alert("saved");
    }
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) =>{
      this.userService.getUserById(1)
      .subscribe((response: User ) => {
        this.user = response;
        this.user.address = this.address;
        console.log(this.user);
      });
    })
  }

 
}