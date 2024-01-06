import { AcademicFriendsService } from './../services/academic-friends/academic-friends.service';
import { Convocation } from './../metadata/convocation/convocation.metadata';
import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ConvocationService } from '../services/convocation/convocation.service';
import { CoreService } from 'src/app/core/services/core/core.service';
import { TABLE_COLUMNS_NAME_CONVOCATION } from '../metadata/convocation/convocation.metadata';

@Component({
  selector: 'app-convocation-consult',
  templateUrl: './convocation-consult.component.html',
  styleUrls: ['./convocation-consult.component.scss']
})
export class ConvocationConsultComponent {
  
  tableData:any[] = [];
  columnNames = TABLE_COLUMNS_NAME_CONVOCATION;

  studentsTableData:any[] = [];
  //studentsTableColumnNames
  constructor(private datePipe:DatePipe, private convocationService:ConvocationService, private coreService:CoreService, private academicFriendsService:AcademicFriendsService){}

  ngOnInit(){
    this.getConvocationActiveService();
  }
  onFormSubmit(formData: any): void {
    //console.log('Form submitted with data:', this.datePipe.transform(formData.dateRange.start,'dd/MM/yyyy HH:mm:ss'));
    console.log('Form submitted with data:',this.formatCreateConvocationObj(formData))
    
  }
  getConvocationActiveService(){
    this.convocationService.getConvocationActive().subscribe({
      next:(res:any)=>{
        
        this.tableData= [res]
        console.log( this.tableData)
      },
      error:(err:Error)=>{
        this.coreService.showMessage("Error al consultar convocatoria activa: "+err.message)
      }
    })
  }

  getRegisteredStudentsByActiveConvocationService(id:number){
    this.academicFriendsService.getAcademicFriendByConvocationActive(id).subscribe({
      next:(res:any)=>{
        this.tableData= [res]
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
