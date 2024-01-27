import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { UploadReportComponent } from './upload-report.component';
import { DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from 'src/app/shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreService } from 'src/app/core/services/core/core.service';
import { ReportService } from '../../services/report/report.service';
import { of, throwError } from 'rxjs';

describe('UploadReportComponent', () => {
  let component: UploadReportComponent;
  let fixture: ComponentFixture<UploadReportComponent>;
  let coreService: CoreService;
  let reportService: ReportService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UploadReportComponent],
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
        MatTabsModule,
        SharedModule,
        BrowserAnimationsModule,
      ],
      providers: [DatePipe],
    });
    fixture = TestBed.createComponent(UploadReportComponent);
    component = fixture.componentInstance;
    coreService = TestBed.inject(CoreService);
    reportService = TestBed.inject(ReportService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call getReportsByAcademicFriend on ngOnInit', () => {
    const getReportsSpy = spyOn(component, 'getReportsByAcademicFriend');

    component.ngOnInit(); // Trigger ngOnInit

    expect(getReportsSpy).toHaveBeenCalled();
  });

  it('should call saveReport onFormSubmit', () => {
    const saveReportSpy = spyOn(reportService, 'saveReport').and.returnValue(
      of({})
    );
    const showMessageSpy = spyOn(coreService, 'showMessage');

    const formData = {
      date: new Date(),
      academicFriend: 'test@example.com',
      type: 'TestType',
      file: new Blob(['file content'], { type: 'text/plain' }),
    };

    component.onFormSubmit(formData);

    expect(saveReportSpy).toHaveBeenCalledWith(jasmine.any(FormData));
    expect(showMessageSpy).toHaveBeenCalledWith('Reporte guardado con éxito');
  });
  it('should call saveReport onFormSubmit', () => {
    const saveReportSpy = spyOn(reportService, 'saveReport').and.returnValue(
      throwError({ message: 'error' })
    );
    const showMessageSpy = spyOn(coreService, 'showMessage');

    const formData = {
      date: new Date(),
      academicFriend: 'test@example.com',
      type: 'TestType',
      file: new Blob(['file content'], { type: 'text/plain' }),
    };

    component.onFormSubmit(formData);

    expect(showMessageSpy).toHaveBeenCalledWith('Se presentó un error: error');
  });
  // Should retrieve reports for a valid academic friend email
  it('should retrieve reports for a valid academic friend email', () => {
    // Arrange
    const userEmail = 'test@example.com';
    spyOn(localStorage, 'getItem').and.returnValue(userEmail);
    const reports = [
      { id: 1, title: 'Report 1' },
      { id: 2, title: 'Report 2' },
    ];
    spyOn(reportService, 'getReportsByAcademicFriend').and.returnValue(
      of(reports)
    );

    // Act
    component.getReportsByAcademicFriend();

    // Assert
    //expect(component.reports).toEqual(reports);
    expect(localStorage.getItem).toHaveBeenCalledWith('email');
    expect(reportService.getReportsByAcademicFriend).toHaveBeenCalledWith(
      userEmail
    );
  });
  it('should retrieve reports for a valid academic friend email', () => {
    // Arrange
    const userEmail = 'test@example.com';
    spyOn(localStorage, 'getItem').and.returnValue(userEmail);
    const reports = [
      { id: 1, title: 'Report 1' },
      { id: 2, title: 'Report 2' },
    ];
    spyOn(reportService, 'getReportsByAcademicFriend').and.returnValue(
      throwError({ message: 'error' })
    );

    // Act
    component.getReportsByAcademicFriend();

    // Assert
    //expect(component.reports).toEqual(reports);
    expect(localStorage.getItem).toHaveBeenCalledWith('email');
    expect(reportService.getReportsByAcademicFriend).toHaveBeenCalledWith(
      userEmail
    );
  });
});
