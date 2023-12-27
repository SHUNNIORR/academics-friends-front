import { Component } from '@angular/core';
import { DynamicFormData } from 'src/app/shared/models/DynamicFormData';
import { ENROLLMENT } from '../metadata/enrollment-academic-friend/enrollment-academic-friend.metadata';
import { EnrollmentService } from '../services/enrollment/enrollment.service';
import { CoreService } from 'src/app/core/services/core/core.service';
import { EnrollStudentRequest } from '../models/Student';

@Component({
  selector: 'app-enrollment-academic-friend',
  templateUrl: './enrollment-academic-friend.component.html',
  styleUrls: ['./enrollment-academic-friend.component.scss']
})
export class EnrollmentAcademicFriendComponent {
  formConfig: DynamicFormData = ENROLLMENT
  constructor(private enrollmentService:EnrollmentService, private coreService:CoreService){

  }
  onFormSubmit(formData: any): void {
    console.log('Form submitted with data:', formData);
    console.log('classSchedule:', formData.classSchedule);
    console.log('resume:', formData.resume.lastModified);

    // Implementar lógica adicional según tus necesidades
    this.enrollStudent(formData);
  }

  enrollStudent(student:EnrollStudentRequest){
    this.enrollmentService.enrollStudent(student).subscribe({
      next:(res:any)=>{
        this.coreService.showMessage("Cursos cargados con exito")
      },
      error:(error:Error)=>{
        this.coreService.showMessage(`Error creando cursos: ${error.message}`)
      }
    })
  }
}
