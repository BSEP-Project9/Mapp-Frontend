import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserDTO } from './UserDTO';
import { ActivationService } from './user-activation.service';

@Component({
  selector: 'app-user-activation',
  templateUrl: './user-activation.component.html',
  styleUrls: ['./user-activation.component.css']
})
export class UserActivationComponent implements OnInit {

  usersList: UserDTO[] = [];
  inputValue: string;
  constructor(private http: HttpClient, private activationService: ActivationService ) {
    this.inputValue = '';
  }

  ngOnInit(): void {
    this.activationService.getUsersList().subscribe((res: UserDTO[])=>{
      res.forEach(user => {
        this.usersList.push(user)
      })
    })
  }


  public accept(obj: UserDTO): void{

  }
  public decline(obj: UserDTO,msg: string): void{
    console.log(obj,msg)
  }

}
