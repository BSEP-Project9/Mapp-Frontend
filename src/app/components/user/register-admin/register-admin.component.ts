import { Component, OnInit } from '@angular/core';
import { AdminDTO } from '../model/user.model';
import { AddressDTO } from '../../users/user-register/address';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-register-admin',
  templateUrl: './register-admin.component.html',
  styleUrls: ['./register-admin.component.css']
})
export class RegisterAdminComponent implements OnInit {


  public adminDto: AdminDTO = {} as AdminDTO;
  public address: AddressDTO = {} as AddressDTO;

  constructor(private userService: UserService) { }

  registerAdmin(){
    this.adminDto.address = this.address;
    this.userService.registerAdmin(this.adminDto).subscribe(
      data => {
        console.log(data);
      },
      error => {
          console.log('Došlo je do greške prilikom registracije.');
      }
  );
  }

  ngOnInit(): void {
  }

}
