import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserDTO } from "./UserDTO";
import { DeclineDTO } from "../DeclineDTO";



@Injectable({
  providedIn: "root"
})


export class ActivationService {
  constructor(private http: HttpClient){}

  getUsersList(): Observable<UserDTO[]> {
    return this.http.get<UserDTO[]>('http://localhost:8040/api/users')
  }

  acceptRequest(obj: UserDTO): Observable<any> {
    return this.http.post<any>('http://localhost:8040/api/auth/approve-account', obj)
  }

  declineRequest(obj: UserDTO, msgg: string): Observable<any> {
    const declineObj: DeclineDTO = {
      msg: msgg,
      id: obj.id,
      email: obj.email,
      name: obj.name,
      surname: obj.surname,
      isActivated: obj.activated

    }
    return this.http.post<any>('http://localhost:8040/api/auth/decline-account',declineObj)
  }
}

