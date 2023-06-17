import { Component, OnInit } from '@angular/core';
import { EngineerDTO } from '../engineerDTO';
import { EngineerService } from './engineers.service';
import { NgFor } from '@angular/common';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-engineers',
  templateUrl: './engineers.component.html',
  styleUrls: ['./engineers.component.css']
})
export class EngineersComponent implements OnInit {

  engineersList: EngineerDTO[] = [];
  constructor(private engineerService: EngineerService) { }

  ngOnInit(): void {
    this.engineerService.getAllEngineers().subscribe((res: EngineerDTO[])=>{
      res.forEach(user => {
        this.engineersList.push(user)
      })
    })
  }

  onSubmit(obj: EngineerDTO){
    console.log("DSGSDGSDGSFDGSDGSD")
    console.log(obj)

    this.engineerService.search(obj).subscribe(response => {
      this.engineersList.splice(0, this.engineersList.length)
      response.forEach(user => {
        this.engineersList.push(user)
      });
    })
  }


}
