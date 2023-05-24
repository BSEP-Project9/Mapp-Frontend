import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AddressDTO } from "./address";

export interface RegistrationDTO{
  email: string;
	password: string;
  confirmPassword: string;
	name: string ;
  surname:  string;
  streetNumber: string;
  city: string;
  streetName: string;
  country: string;
  phoneNumber: string;
  role: string;
}
export interface RegDTO{
  email: string;
	password: string;
  confirmPassword: string;
	name: string ;
  surname:  string;
  address: AddressDTO;
  phoneNumber: string;
  role: string;
}

@Injectable({
  providedIn: "root"
})

export class RegistrationService{
  constructor(private http: HttpClient){}


  onSubmit( obj: RegDTO): Observable<any>{
    console.log(obj)
    return this.http.post('http://localhost:8040/api/users', obj)
  }
}
