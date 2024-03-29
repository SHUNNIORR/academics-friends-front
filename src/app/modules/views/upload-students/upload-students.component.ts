import { FileService } from './../../services/file/file.service';
import { Component } from '@angular/core';
import { SEARCH_STUDENTS, UPLOAD_STUDENTS } from '../../metadata/upload-students/upload-students.metadata';
import { CoursesService } from '../../services/courses/courses.service';
import { CoreService } from 'src/app/core/services/core/core.service';
import { StudentsService } from '../../services/students/students.service';
import { StudentInfo } from '../../models/Student';

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
    private coreService: CoreService,
    private fileService:FileService
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
      error: (err: any) => {
        console.log('error', err.error.message);
      },
    });
  }
  createStudents(file: File) {
    this.studentsService.createStudents(file).subscribe({
      next: (res: any) => {
        this.coreService.showMessage('Estudiantes cargados con exito');
      },
      error: (err: any) => {
        this.coreService.showMessage(
          `Error cargando Estudiantes: ${err.error.message}`
        );
      },
    });
  }
  dowloadFormat(fileUrl:string){
    this.fileService.downloadFile(fileUrl).subscribe({
      next:blob => {
        const file = new Blob([blob], { type: 'application/octet-stream' });

        // Crear un enlace temporal y simular un clic para descargar el archivo
        const url = window.URL.createObjectURL(file);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${fileUrl}`; // Puedes establecer el nombre del archivo aquí
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        this.coreService.showMessage("Archivo descargado con éxito")
      },
      error:(err:any)=>{
        this.coreService.showMessage('Hubo un error descargando el archivo:'+ err.message);
      }
    })
  }
}
