import { Component, OnInit } from '@angular/core';
import { Address, Skills, User, UserDto } from '../model/user.model';
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
  public skills : Skills = {} as Skills;
  isEditMode: boolean = false;
  public role = '';
  public newPassword = '';
  isPasswordEditMode: boolean = false;

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
    }
  }

  toggleEditPasswordMode() {
    this.isPasswordEditMode = !this.isPasswordEditMode;
    if (!this.isPasswordEditMode) {
      alert("saved password");
      console.log(this.newPassword);
      this.userService.editPassword({ email:this.user.email, updatedPassword: this.newPassword }).subscribe(data => console.log(data));
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

  addSkill() {
    this.userService.addSkill(this.skills, this.authService.getUserId())
    .subscribe(data => {
      console.log(data);
      this.userService.getUserById(this.authService.getUserId())
      .subscribe((response: UserDto ) => {
        this.user = response;
        console.log(this.user);
      });
    });
  }
 
}