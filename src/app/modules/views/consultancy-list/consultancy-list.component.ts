import { Component } from '@angular/core';
import { CoreService } from 'src/app/core/services/core/core.service';
import { ConsultancyService } from '../../services/consultancy/consultancy.service';
import { TABLE_COLUMNS_NAME_CONSULTANCY } from '../../metadata/consultancy/consultancy.metadata';
import { FileService } from '../../services/file/file.service';

@Component({
  selector: 'app-consultancy-list',
  templateUrl: './consultancy-list.component.html',
  styleUrls: ['./consultancy-list.component.scss']
})
export class ConsultancyListComponent {
  tableData:any[] = [];
  columnNames:any[] = TABLE_COLUMNS_NAME_CONSULTANCY;
  email = localStorage.getItem('email');
 
  constructor(private coreService:CoreService,private consultancyService: ConsultancyService, private fileService:FileService){

  }

  ngOnInit(){
    this.getAllConsultancy()
  }

  getAllConsultancy(){
    if(this.email){
      this.consultancyService.getAllConsultancyByEmail(this.email).subscribe({
        next:(res:any)=>{
          this.tableData=res;
        },
        error:(err:any)=>{
          this.coreService.showMessage('Hubo un error: ' + err.error.message)
        }
      })
    }
  }
  downloadConsultancies(fileArray:any,nombre:string){
    this.fileService.convertFile(fileArray).subscribe({
      next:(blob)=>{
        const file = new Blob([blob], { type: 'application/octet-stream' });

        // Crear un enlace temporal y simular un clic para descargar el archivo
        const url = window.URL.createObjectURL(file);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${nombre}.xlsx`; // Puedes establecer el nombre del archivo aquí
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        this.coreService.showMessage('Archivo descargado con éxito');
      },
      error:()=>{}
    })
  }
}
