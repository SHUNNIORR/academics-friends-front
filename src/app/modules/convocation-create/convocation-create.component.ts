import { Component } from '@angular/core';
import { CREATE_CONVOCATION } from '../metadata/convocation/convocation.metadata';
import { DatePipe } from '@angular/common';
import { ConvocationService } from '../services/convocation/convocation.service';
import { CoreService } from 'src/app/core/services/core/core.service';

@Component({
  selector: 'app-convocation-create',
  templateUrl: './convocation-create.component.html',
  styleUrls: ['./convocation-create.component.scss']
})
export class ConvocationCreateComponent {
  createConvocation = CREATE_CONVOCATION;
  constructor(private datePipe:DatePipe, private convocationService:ConvocationService, private coreService:CoreService){}
  onFormSubmit(formData: any): void {
    //console.log('Form submitted with data:', this.datePipe.transform(formData.dateRange.start,'dd/MM/yyyy HH:mm:ss'));
    console.log('Form submitted with data:',this.formatCreateConvocationObj(formData))
    this.createConvocationService(this.formatCreateConvocationObj(formData));
  }
  createConvocationService(convocationObj:any){
    this.convocationService.createConvocation(convocationObj).subscribe({
      next:()=>{
        this.coreService.showMessage("¡Convocatoria creada con exito!")
      },
      error:(err:Error)=>{
        this.coreService.showMessage("Error al crear convocatoria: "+err.message)
      }
    })
  }
  formatCreateConvocationObj(formData: any){
    const{end,start} = formData.dateRange;
    const{evaluationDate,resultsReleaseDate}= formData;
    const convocationObj={
      id:null,
      openingDate:this.formatDate(start),
      closingDate:this.formatDate(end),
      evaluationDate:this.formatDate(evaluationDate),
      resultsReleaseDate:this.formatDate(resultsReleaseDate),
    }
    return convocationObj;

  }
  formatDate(date: Date){
    return this.datePipe.transform(date,'yyyy-MM-ddTHH:mm:ss')
  }
}
