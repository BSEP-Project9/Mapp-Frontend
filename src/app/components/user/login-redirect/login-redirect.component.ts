import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../service/auth/auth.service';
import { XhrFactory } from '@angular/common';

@Component({
  selector: 'app-login-redirect',
  templateUrl: './login-redirect.component.html',
  styleUrls: ['./login-redirect.component.css']
})
export class LoginRedirectComponent implements OnInit {

  constructor(private route:ActivatedRoute,
              private authService:AuthService) { }

  ngOnInit(): void {
    const token = this.route.snapshot.queryParams['token'];
    if(token !== null){
      const newToken = token.split('&email')[0]
      console.log(newToken)
      const email = this.route.snapshot.queryParams['email'];
      console.log(email)
      var decodedToken = decodeURIComponent(newToken);
      this.authService.confirmEmailLogin(decodedToken, email)
  }
  }

}
