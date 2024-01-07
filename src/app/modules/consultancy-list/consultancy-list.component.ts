import { Component } from '@angular/core';
import { CoreService } from 'src/app/core/services/core/core.service';
import { ConsultancyService } from '../services/consultancy/consultancy.service';
import { TABLE_COLUMNS_NAME_CONSULTANCY } from '../metadata/consultancy/consultancy.metadata';

@Component({
  selector: 'app-consultancy-list',
  templateUrl: './consultancy-list.component.html',
  styleUrls: ['./consultancy-list.component.scss']
})
export class ConsultancyListComponent {
  tableData:any[] = [];
  columnNames:any[] = TABLE_COLUMNS_NAME_CONSULTANCY;
  email = localStorage.getItem('email');
 
  constructor(private coreService:CoreService,private consultancyService: ConsultancyService){

  }

  ngOnInit(){
    this.getAllConsultancy()
  }

  getAllConsultancy(){
    if(this.email){
      this.consultancyService.getAllConsultancyByEmail(this.email).subscribe({
        next:(res:any)=>{
          console.log(res)
          this.tableData=res;
        },
        error:(err:Error)=>{
          console.log(err)
          this.coreService.showMessage('Hubo un error: ' + err.message)
        }
      })
    }
  }
}
