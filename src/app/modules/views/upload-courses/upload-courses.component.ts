import { CoreService } from '../../../core/services/core/core.service';
import { CoursesService } from '../../services/courses/courses.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { Component } from '@angular/core';
import { UPLOAD_COURSES } from '../../metadata/upload-courses/upload-courses.metadata';
import { DynamicFormData } from 'src/app/shared/models/DynamicFormData';

@Component({
  selector: 'app-upload-courses',
  templateUrl: './upload-courses.component.html',
  styleUrls: ['./upload-courses.component.scss']
})
export class UploadCoursesComponent {
  formConfig: DynamicFormData = UPLOAD_COURSES

  constructor(private coursesService:CoursesService, private coreService:CoreService){

  }
  onFormSubmit(formData: any): void {
    this.createCourses(formData.file);
  }

  createCourses(file:File){
    this.coursesService.createCourses(file).subscribe({
      next:(res:any)=>{
        this.coreService.showMessage("Cursos cargados con exito")
      },
      error:(error:Error)=>{
        this.coreService.showMessage(`Error creando cursos: ${error.message}`)
      }
    })
  }
}
