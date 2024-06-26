import { Component, OnInit } from '@angular/core';
import { Credentials } from '../model/loginDTO.model';
import { AuthService } from '../service/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public userCredentials: Credentials = {} as Credentials

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    
  }

  loginUser(){
    if(this.userCredentials.email !== undefined && this.userCredentials.password !== undefined){
      this.authService.handleLogin(this.userCredentials)
    }
    else
      alert("Credentials are invalid")
  }

}
