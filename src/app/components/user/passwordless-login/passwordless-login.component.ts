import { Component, OnInit } from '@angular/core';
import { PassworldessLogin } from '../model/loginDTO.model';
import { AuthService } from '../service/auth/auth.service';

@Component({
  selector: 'app-passwordless-login',
  templateUrl: './passwordless-login.component.html',
  styleUrls: ['./passwordless-login.component.css']
})
export class PasswordlessLoginComponent implements OnInit {

  public credential: PassworldessLogin = {} as PassworldessLogin;

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
  }

  sendEmail(){
    this.authService.handlePasswordlessLogin(this.credential).subscribe(()=>{
      alert("Email is send")
    })
  }

}
