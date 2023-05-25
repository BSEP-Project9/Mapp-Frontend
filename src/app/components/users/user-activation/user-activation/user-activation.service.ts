import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserDTO } from "./UserDTO";


@Injectable({
  providedIn: "root"
})

export class ActivationService {
  constructor(private http: HttpClient){}

  getUsersList(): Observable<UserDTO[]> {
    return this.http.get<UserDTO[]>('http://localhost:8040/api/users')
  }
}

