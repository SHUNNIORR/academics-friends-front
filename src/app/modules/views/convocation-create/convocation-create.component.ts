import { Component } from '@angular/core';
import { CREATE_CONVOCATION } from '../../metadata/convocation/convocation.metadata';
import { DatePipe } from '@angular/common';
import { ConvocationService } from '../../services/convocation/convocation.service';
import { CoreService } from 'src/app/core/services/core/core.service';

@Component({
  selector: 'app-convocation-create',
  templateUrl: './convocation-create.component.html',
  styleUrls: ['./convocation-create.component.scss']
})
export class ConvocationCreateComponent {
  createConvocation = CREATE_CONVOCATION;
  thereActiveConsultancy: boolean = false;
  constructor(private datePipe:DatePipe, private convocationService:ConvocationService, private coreService:CoreService){}
  ngAfterViewInit() {
    this.getConvocationActiveService();
  }
  getConvocationActiveService() {
    this.convocationService.getConvocationActive().subscribe({
      next: (res: any) => {
        res==null?this.thereActiveConsultancy=false:this.thereActiveConsultancy=true
      },
      error: (err: Error) => {
        this.coreService.showMessage(
          'Error al consultar convocatoria activa: ' + err.message
        );
      },
    });
  }
  onFormSubmit(formData: any): void {
    this.createConvocationService(this.formatCreateConvocationObj(formData));
  }
  createConvocationService(convocationObj:any){
    this.convocationService.createConvocation(convocationObj).subscribe({
      next:()=>{
        this.coreService.showMessage("¡Convocatoria creada con exito!")
      },
      error:(err:any)=>{
        this.coreService.showMessage("Error al crear convocatoria: "+err.error.message)
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
