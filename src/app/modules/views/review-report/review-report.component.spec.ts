import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewReportComponent } from './review-report.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from 'src/app/shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common';
import { of, throwError } from 'rxjs';
import { CoreService } from 'src/app/core/services/core/core.service';
import { ReportService } from '../../services/report/report.service';

describe('ReviewReportComponent', () => {
  let component: ReviewReportComponent;
  let fixture: ComponentFixture<ReviewReportComponent>;
  let coreService: CoreService;
  let reportService: ReportService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReviewReportComponent],
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
        MatTabsModule,
        SharedModule,
        BrowserAnimationsModule,
      ],
      providers: [DatePipe],
    });
    fixture = TestBed.createComponent(ReviewReportComponent);
    component = fixture.componentInstance;
     coreService= TestBed.inject(CoreService);
   reportService= TestBed.inject(ReportService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('getAllReportsPending', () => {
    spyOn(
      reportService,
      'getAllReports'
    ).and.returnValue(of([]));
    component.getAllReportsPending();
  });
  
  it('getAllReportsPending error', () => {
    spyOn(
      reportService,
      'getAllReports'
    ).and.returnValue(throwError({ message: 'error' }));
    component.getAllReportsPending();
  });
  it('getAllReportsPending', () => {
    const userEmail = 'user@example.com';
    spyOn(localStorage, 'getItem').and.returnValue(userEmail)
    spyOn(
      reportService,
      'getReportsByAcademicFriend'
    ).and.returnValue(of([]));
    component.getReportsByAcademicFriend();
  });
  
  it('getAllReportsPending error', () => {
    const userEmail = 'user@example.com';
    spyOn(localStorage, 'getItem').and.returnValue(userEmail)
    spyOn(
      reportService,
      'getReportsByAcademicFriend'
    ).and.returnValue(throwError({ message: 'error' }));
    component.getReportsByAcademicFriend();
  });
  it('onFormSubmit',()=>{
    spyOn(
      reportService,
      'saveReport'
    ).and.returnValue(of([]));
    component.onFormSubmit({})
  })
  it('onFormSubmit',()=>{
    spyOn(
      reportService,
      'saveReport'
    ).and.returnValue(throwError({ message: 'error' }));
    component.onFormSubmit({})
  })
});
