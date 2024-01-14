import { Component } from '@angular/core';
import { SEARCH_STUDENTS, UPLOAD_STUDENTS } from '../metadata/upload-students/upload-students.metadata';
import { CoursesService } from '../services/courses/courses.service';
import { CoreService } from 'src/app/core/services/core/core.service';
import { StudentsService } from '../services/students/students.service';
import { StudentInfo } from '../models/Student';

@Component({
  selector: 'app-upload-students',
  templateUrl: './upload-students.component.html',
  styleUrls: ['./upload-students.component.scss'],
})
export class UploadStudentsComponent {
  uploadStudents = UPLOAD_STUDENTS;
  searchStudent = SEARCH_STUDENTS;
  studentInfo: StudentInfo | null = null;
  constructor(
    private studentsService: StudentsService,
    private coreService: CoreService
  ) {}
  onFormSubmit(formData: any): void {
    this.createStudents(formData.file);
  }
  onSearchStudent(formData: any): void {
    this.searchStudentService(formData.studentCode);
  }

  searchStudentService(code: string) {
    this.studentsService.searchStudent(code).subscribe({
      next: (res: any) => {
        if(res){
          this.studentInfo = res;
        }else{
          this.coreService.showMessage("No se encontró ningún estudiante")
        }
      },
      error: (error: Error) => {
        console.log('error', error.message);
      },
    });
  }
  createStudents(file: File) {
    this.studentsService.createStudents(file).subscribe({
      next: (res: any) => {
        this.coreService.showMessage('Estudiantes cargados con exito');
      },
      error: (error: Error) => {
        this.coreService.showMessage(
          `Error cargando Estudiantes: ${error.message}`
        );
      },
    });
  }
}
