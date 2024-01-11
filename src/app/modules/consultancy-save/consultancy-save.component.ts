import { Component } from '@angular/core';
import { DynamicFormData } from 'src/app/shared/models/DynamicFormData';
import { CoordinatorService } from '../services/coordinator/coordinator.service';
import { CoreService } from 'src/app/core/services/core/core.service';
import { SAVE_CONSULTANCY } from '../metadata/consultancy/consultancy.metadata';
import { DatePipe } from '@angular/common';
import { ConsultancyService } from '../services/consultancy/consultancy.service';
import { CoursesService } from '../services/courses/courses.service';

@Component({
  selector: 'app-consultancy-save',
  templateUrl: './consultancy-save.component.html',
  styleUrls: ['./consultancy-save.component.scss']
})
export class ConsultancySaveComponent {
  formConfig: DynamicFormData = SAVE_CONSULTANCY

  constructor(private datePipe:DatePipe,private consultancyService: ConsultancyService, private coreService:CoreService, private courseService:CoursesService){

  }

  ngOnInit(){
    //this.getAllCoursesService()
  }
  onFormSubmit(formData: any): void {
    this.saveConsultancyService( this.formatSaveConsultancyObj(formData));
  }

  saveConsultancyService(formData: any){
    this.consultancyService.saveConsultancy(formData).subscribe({
      next:(res:any)=>{
        this.coreService.showMessage("Asesoría guardada con éxito por: "+ res.academicFriendEmail)
      },
      error:(err:any)=>{
        this.coreService.showMessage("Error al guardar asesoria: "+err.error.message)
      }
    })
  }

  formatSaveConsultancyObj(formData: any){
    const{endDate,startDate} = formData;
    
    formData.startDate = this.formatDate(startDate);
    formData.endDate = this.formatDate(endDate);
    formData = {
      academicFriendEmail: localStorage.getItem('email'),
      ...formData
    }
    return formData;
  }
  formatDate(date: Date){
    return this.datePipe.transform(date,'yyyy-MM-ddTHH:mm:ss')
  }
  getAllCoursesService(){
    this.courseService.getAllCourses().subscribe({
      next:(res:any)=>{
        const selectOptionsCourses:any = []
        res.map((course:any)=>{
          selectOptionsCourses.push({
            value: course.name, label:  course.name
          })
        })
        console.log('CURSOSSSS', selectOptionsCourses)
        this.formConfig.fields[1].selectOptions=selectOptionsCourses;
      },
      error:(err:any)=>{

      }
    })
  }
}
