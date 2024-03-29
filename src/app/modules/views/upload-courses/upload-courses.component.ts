import { FileService } from './../../services/file/file.service';
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

  constructor(private coursesService:CoursesService, private coreService:CoreService, private fileService:FileService){

  }
  onFormSubmit(formData: any): void {
    this.createCourses(formData.file);
  }

  createCourses(file:File){
    this.coursesService.createCourses(file).subscribe({
      next:(res:any)=>{
        this.coreService.showMessage("Cursos cargados con exito")
      },
      error:(err:any)=>{
        this.coreService.showMessage(`Error creando cursos: ${err.error.message}`)
      }
    })
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
