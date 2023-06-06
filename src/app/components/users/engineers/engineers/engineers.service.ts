import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { EngineerDTO } from "../engineerDTO";


@Injectable({
  providedIn: "root"
})

export class EngineerService{

  constructor(private http: HttpClient) {}

  getAllEngineers(): Observable<EngineerDTO[]> {
    return this.http.get<EngineerDTO[]>('http://localhost:8040/api/users/engineers')
  }

  search(obj: EngineerDTO): Observable<EngineerDTO[]> {
    return this.http.post<EngineerDTO[]>('http://localhost:8040/api/users/search',obj)
  }
}
