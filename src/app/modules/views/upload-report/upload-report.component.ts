import { ReportResponse } from '../../metadata/upload-report/upload-report.metadata';
import { Component } from '@angular/core';
import { CREATE_REPORT } from '../../metadata/upload-report/upload-report.metadata';
import { DynamicFormData } from 'src/app/shared/models/DynamicFormData';
import { Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { CoreService } from 'src/app/core/services/core/core.service';
import { ReportService } from '../../services/report/report.service';
import { Subscription } from 'rxjs';
import { FileService } from '../../services/file/file.service';

@Component({
  selector: 'app-upload-report',
  templateUrl: './upload-report.component.html',
  styleUrls: ['./upload-report.component.scss'],
})
export class UploadReportComponent {
  private reportUpdatedSubscription: Subscription;
  formConfig: DynamicFormData = CREATE_REPORT;
  userEmail: string | null = null;
  reports: ReportResponse[] = []
  
  constructor(
    private datePipe: DatePipe,
    private coreService: CoreService,
    private reportService: ReportService,
    private fileService:FileService,
  ) {
    this.reportUpdatedSubscription = this.reportService.onReportUpdated().subscribe(() => {
      this.getReportsByAcademicFriend()
      // Lógica para recargar la información
    });
  }

  ngOnInit() {
    this.getReportsByAcademicFriend()
    
  }
  getReportsByAcademicFriend(){
    this.userEmail = localStorage.getItem('email');
    if (this.userEmail) {
      this.reportService.getReportsByAcademicFriend(this.userEmail).subscribe({
        next: (res: any) => {
          this.reports = res;
        },
        error: (err: Error) => {
          this.coreService.showMessage('Se presentó un error: ' + err.message);
        },
      });
    }
  }
  ngOnDestroy(): void {
    // Desuscribirse para evitar posibles pérdidas de memoria
    this.reportUpdatedSubscription.unsubscribe();
  }
  onFormSubmit(formData: any): void {
    const formDataTest = new FormData();
    formData.date = this.formatDate(formData.date);
    formData.academicFriend = this.userEmail;
    formDataTest.append('academicFriend', formData.academicFriend);
    formDataTest.append('date', formData.date);
    formDataTest.append('type', formData.type);
    formDataTest.append('file', formData.file);
    this.reportService.saveReport(formDataTest).subscribe({
      next: () => {
        this.coreService.showMessage('Reporte guardado con éxito');
        this.getReportsByAcademicFriend();
      },
      error: (err: Error) => {
        this.coreService.showMessage('Se presentó un error: ' + err.message);
      },
    });
  }
  formatDate(date: Date) {
    return this.datePipe.transform(date, 'yyyy-MM-ddTHH:mm:ss');
  }
  dowloadReportFormat(fileUrl:string){
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
