import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { CoreService } from 'src/app/core/services/core/core.service';
import { ReportService } from '../../services/report/report.service';
import { CREATE_REPORT, ReportResponse } from '../../metadata/upload-report/upload-report.metadata';
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

  constructor(
    private datePipe: DatePipe,
    private coreService: CoreService,
    private reportService: ReportService
  ) {
    this.reportUpdatedSubscription = this.reportService.onReportUpdated().subscribe(() => {
      this.getAllReportsPending();
    });
  }

  ngOnInit() {
    this.getAllReportsPending();
  }
  getAllReportsPending(){
    this.reportService.getAllReports().subscribe({
      next: (res: any) => {
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
