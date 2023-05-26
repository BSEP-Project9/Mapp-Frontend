import { Component, OnInit } from '@angular/core';
import { Address, User, UserDto } from '../model/user.model';
import { UserService } from '../service/user.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from '../service/auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  
  public user : UserDto = {} as UserDto;
  public address : Address = {} as Address;
  isEditMode: boolean = false;

  constructor(private userService : UserService, 
              private router : Router, 
              private route: ActivatedRoute,
              private authService: AuthService) { }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
    if (!this.isEditMode) {
      alert("saved");
      console.log(this.user);
      this.userService.edit(this.user).subscribe(data => console.log(data));
      window.location.reload();
    }
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) =>{
      this.userService.getUserById(this.authService.getUserId())
      .subscribe((response: UserDto ) => {
        this.user = response;
        console.log(this.user);
      });
    })
  }

 
}