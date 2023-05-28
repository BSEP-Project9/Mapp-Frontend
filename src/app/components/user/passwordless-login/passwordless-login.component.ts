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
    if(this.credential.email !== undefined){
      this.authService.handlePasswordlessLogin(this.credential)
    .subscribe({
      next:data =>{
        alert("Email is send")
      },
      error: error => {
        alert("Account not activated or does not exist")
      }
    })
    }else{
      alert("Credentials are invalid")
    }
  }

}
