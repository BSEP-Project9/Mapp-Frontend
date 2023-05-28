import { Component, OnInit } from '@angular/core';
import { RegDTO, RegistrationDTO, RegistrationService } from './user-register.service';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AddressDTO } from './address';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  constructor(private http: HttpClient, private snackBar: MatSnackBar , private registerService:RegistrationService, private m_Router:Router  ) { }


  ngOnInit(): void {
  }

  onSubmit(obj: RegistrationDTO){
    console.log(obj.role)
    console.log("GDSFGSDGSFDGFSDG")
    const address: AddressDTO = {
      city: obj.city,
      country: obj.country,
      streetName: obj.streetName,
      streetNumber: obj.streetNumber,
    }
    const reg: RegDTO = {
      email: obj.email,
      password: obj.password,
      confirmPassword: obj.confirmPassword,
      name: obj.name,
      surname: obj.surname,
      address: address,
      phoneNumber: obj.phoneNumber,
      role: obj.role,
    }
    if(!(obj.city == "" || obj.password  == "" || obj.country == "" || obj.phoneNumber == ""  || obj.role == "" || obj.name == "" || obj.surname == "" || obj.streetName == "" || obj.streetName  == "" || obj.email == "")){
      if(obj.password == obj.confirmPassword){
        const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])/;
        const hasSpecialCharAndCapital = regex.test(obj.password);
        //const eRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        //const isValidEmail = eRegex.test(obj.email);
        //if(obj.password.length >=4 && hasSpecialCharAndCapital){

        this.registerService.onSubmit(reg).subscribe(response =>{
          this.snackBar.open('User Registered!','Ok', {
            duration: 4000

            })
          this.m_Router.navigate(['/login']);
        }, error=>{
          this.snackBar.open("User Failed To Register!",'Ok', {
            duration: 4000
            })
        })

      //} else alert("Password does not meet the requirements ")
      } else alert("Passwords do not match")
    } else alert("Fill all the fields!")


  }
}
