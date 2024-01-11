import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { CoreService } from 'src/app/core/services/core/core.service';
import { ReportService } from '../services/report/report.service';
import { CREATE_REPORT, ReportResponse } from '../metadata/upload-report/upload-report.metadata';
import { DynamicFormData } from 'src/app/shared/models/DynamicFormData';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-review-report',
  templateUrl: './review-report.component.html',
  styleUrls: ['./review-report.component.scss']
})
export class ReviewReportComponent {
  private reportUpdatedSubscription: Subscription;
  formConfig: DynamicFormData = CREATE_REPORT;
  userEmail: string | null = null;
  reports: ReportResponse[] = []
  // reports: ReportResponse[] = [
  //   {
  //     id: 6,
  //     academicFriendEmail: 'prueba1@ufps.edu.co',
  //     type: 'monthly',
  //     observations: null,
  //     state: 'pending',
  //     date: new Date('2024-01-02T00:00'),
  //     uploadDate: new Date('2024-01-02T23:58:32.252873'),
  //     file: 'report/28371b4c-05f7-49e1-a55b-a8ab845b3a97.pdf',
  //   },
  //   {
  //     id: 7,
  //     academicFriendEmail: 'prueba1@ufps.edu.co',
  //     type: 'monthly',
  //     observations: null,
  //     state: 'withCorrections',
  //     date: new Date('2024-01-02T00:00'),
  //     uploadDate: new Date('2024-01-02T23:58:32.252873'),
  //     file: 'report/28371b4c-05f7-49e1-a55b-a8ab845b3a97.pdf',
  //   },
  //   {
  //     id: 8,
  //     academicFriendEmail: 'prueba1@ufps.edu.co',
  //     type: 'monthly',
  //     observations: null,
  //     state: 'pass',
  //     date: new Date('2024-01-02T00:00'),
  //     uploadDate: new Date('2024-01-02T23:58:32.252873'),
  //     file: 'report/28371b4c-05f7-49e1-a55b-a8ab845b3a97.pdf',
  //   },
  //   {
  //     id: 9,
  //     academicFriendEmail: 'prueba1@ufps.edu.co',
  //     type: 'final',
  //     observations: null,
  //     state: 'rejected',
  //     date: new Date('2024-01-02T00:00'),
  //     uploadDate: new Date('2024-01-02T23:58:32.252873'),
  //     file: 'report/28371b4c-05f7-49e1-a55b-a8ab845b3a97.pdf',
  //   },
  // ];

  constructor(
    private datePipe: DatePipe,
    private coreService: CoreService,
    private reportService: ReportService
  ) {
    this.reportUpdatedSubscription = this.reportService.onReportUpdated().subscribe(() => {
      // Realizar acciones necesarias cuando se actualiza un informe
      console.log('Se ha actualizado un informe. Recargar datos...');
      this.getAllReportsPending();
      // Lógica para recargar la información
    });
  }

  ngOnInit() {
    this.getAllReportsPending();
  }
  getAllReportsPending(){
    this.reportService.getAllReports().subscribe({
      next: (res: any) => {
        console.log(res);
        this.reports = res.filter((obj: { state: string; }) => obj.state === "pending");;
      },
      error: (err: Error) => {
        this.coreService.showMessage('Se presentó un error: ' + err.message);
      },
    });
  }
  getReportsByAcademicFriend(){
    this.userEmail = localStorage.getItem('email');
    if (this.userEmail) {
      this.reportService.getReportsByAcademicFriend(this.userEmail).subscribe({
        next: (res: any) => {
          console.log(res);
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
    console.log('Form submitted with data:', formDataTest);
    this.reportService.saveReport(formDataTest).subscribe({
      next: () => {
        this.coreService.showMessage('Reporte guardado con éxito');
      },
      error: (err: Error) => {
        this.coreService.showMessage('Se presentó un error: ' + err.message);
      },
    });
  }
  formatDate(date: Date) {
    return this.datePipe.transform(date, 'yyyy-MM-ddTHH:mm:ss');
  }
}
