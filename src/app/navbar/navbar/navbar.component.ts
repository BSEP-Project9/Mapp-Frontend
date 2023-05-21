import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/components/user/service/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public userExists = '';
  public role = '';

  constructor(private router:Router,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.currentNav.subscribe(message =>{
      const role = this.authService.getRole();
      console.log("**** navbar:"+ role)
      this.role = role ? role : '';
      console.log(this.role)
      this.userExists = message;
    })
  }

  public logout(){
    this.authService.logout();
    this.role = '';
  }

}
