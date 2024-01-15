import { Component } from '@angular/core';
import { ConsultancyService } from '../../services/consultancy/consultancy.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  simpleStats:any = null
  constructor(private consultancyService:ConsultancyService){

  }
  ngOnInit(){
    this.getSimpleStats()
  }

  getSimpleStats(){
    this.consultancyService.getSimpleConsultancyStats().subscribe({
      next:(res)=>{
        this.simpleStats=res
      },
      error:()=>{

      }
    })
  }
  
}
