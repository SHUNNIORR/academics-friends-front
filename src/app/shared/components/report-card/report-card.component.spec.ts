import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { ReportCardComponent } from './report-card.component';
import { CoreService } from 'src/app/core/services/core/core.service';
import { FileService } from 'src/app/modules/services/file/file.service';
import { DialogService } from '../../services/dialog/dialog.service';
import { ReportService } from 'src/app/modules/services/report/report.service';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { QUALIFY_REPORT_AACA, UPDATE_REPORT_AACA } from 'src/app/modules/metadata/upload-report/upload-report.metadata';

describe('ReportCardComponent', () => {
  let component: ReportCardComponent;
  let fixture: ComponentFixture<ReportCardComponent>;
  let coreServiceSpy: CoreService;
  let fileServiceSpy: FileService;
  let dialogServiceSpy: DialogService;
  let reportServiceSpy: ReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        MatSnackBarModule,
        BrowserAnimationsModule,
        HttpClientTestingModule,
      ],
      providers: [MatSnackBarModule],
      declarations: [ReportCardComponent],
    });
    fixture = TestBed.createComponent(ReportCardComponent);
    component = fixture.componentInstance;
    coreServiceSpy = TestBed.inject(CoreService)
    fileServiceSpy = TestBed.inject(FileService)
    dialogServiceSpy = TestBed.inject(DialogService);
    reportServiceSpy = TestBed.inject(ReportService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  // Downloads a file successfully when given a valid file URL.
  it('should download file successfully when given a valid file URL', () => {
    // Arrange
    const fileUrl = 'valid_file_url';
    spyOn(fileServiceSpy, 'downloadFile').and.returnValue(of(new Blob()));;
    spyOn(coreServiceSpy, 'showMessage');
    // Act
    component.downloadReport(fileUrl);

    // Assert
    expect(fileServiceSpy.downloadFile).toHaveBeenCalledWith(fileUrl);
    expect(coreServiceSpy.showMessage).toHaveBeenCalledWith(
      'Archivo descargado con éxito'
    );
  });
  it('should show a message with the error message if the API call fails', () => {
    const fileUrl = 'valid_file_url';
    const errorMessage = 'API call failed';
    spyOn(fileServiceSpy, 'downloadFile').and.returnValue(
      throwError({message: errorMessage })
    );
    const showMessageSpy = spyOn(coreServiceSpy, 'showMessage');
    component.downloadReport(fileUrl);
    expect(showMessageSpy).toHaveBeenCalledWith(
      'Hubo un error descargando el archivo:' + errorMessage
    );
  });
  it('should call openDialogCorrectReport when event id is "uploadContract"', () => {
    const formData = UPDATE_REPORT_AACA
    formData.fields[0].value=new File([],'')
    const event = {
      file: new File([],''),
      id: 'uploadContract',
      element: {},
    };
    const dialogRefMock: Partial<MatDialogRef<any, any>> = {
      afterClosed: () => of(event)
    };
    spyOn(dialogServiceSpy,'openDynamicDialog').and.returnValue(dialogRefMock as MatDialogRef<any, any>)
    spyOn(component, 'correctReportService')
    // Llamar a la función que se va a probar
    component.openDialogCorrectReport(1,formData);

    // Verificar que se llamó a la función esperada
    expect(component.correctReportService).toHaveBeenCalledWith(1, event.file);
  });
  it('should call openDialogCorrectReport when event id is "uploadContract"', () => {
    const formData = QUALIFY_REPORT_AACA
    formData.fields[0].value=new File([],'')
    const event = {
      file: new File([],''),
      id: 'uploadContract',
      element: {},
    };
    const dialogRefMock: Partial<MatDialogRef<any, any>> = {
      afterClosed: () => of(event)
    };
    spyOn(dialogServiceSpy,'openDynamicDialog').and.returnValue(dialogRefMock as MatDialogRef<any, any>)
    spyOn(component, 'qualifyReportService')
    spyOn(component, 'correctReportService')
    // Llamar a la función que se va a probar
    component.openDialogQualifyReport(1);
    // Verificar que se llamó a la función esperada
    expect(component.correctReportService).toHaveBeenCalledWith(1, new File([],''));
    expect(component.qualifyReportService).toHaveBeenCalledWith(event);
  });
  it('should call updateReport and showMessage when qualifying report', () => {
    // Arrange
    const reportObj = { id: 1, /* other properties */ };
    const updateReportSpy = spyOn(reportServiceSpy,'updateReport').and.returnValue(of({}));
    const showMessageSpy = spyOn(coreServiceSpy, 'showMessage');
    // Act
    component.qualifyReportService(reportObj);

    // Assert
    expect(updateReportSpy).toHaveBeenCalledWith(reportObj);
    expect(showMessageSpy).toHaveBeenCalledWith('Reporte Calificado correctamente!');
  });

  it('should call correctReport and showMessage when correcting report', () => {
    // Arrange
    const reportId = 1;
    const file = new File(['mock content'], 'mock-report.docx');
    const correctReportSpy = spyOn(reportServiceSpy,'correctReport').and.returnValue(of({}));
    const showMessageSpy = spyOn(coreServiceSpy, 'showMessage');
    // Act
    component.correctReportService(reportId, file);

    // Assert
    expect(correctReportSpy).toHaveBeenCalledWith(reportId, file);
    expect(showMessageSpy).toHaveBeenCalledWith('Reporte corregido correctamente!');
  });
  
    it('should call correctReport and showMessage when correcting report', () => {
      // Arrange
      const reportId = 1;
      const file = new File(['mock content'], 'mock-report.docx');
      const showMessageSpy = spyOn(coreServiceSpy, 'showMessage');
      // Act
      const errorMessage = 'API call failed';
      spyOn(reportServiceSpy,'correctReport').and.returnValue(
        throwError({error:{message: errorMessage} })
      );
      component.correctReportService(reportId, file);
  
      expect(showMessageSpy).toHaveBeenCalledWith('Hubo un error actualizando el reporte:API call failed');
    });
    it('should call correctReport and showMessage when correcting report', () => {
      // Arrange
      const reportId = 1;
      const file = new File(['mock content'], 'mock-report.docx');
      const showMessageSpy = spyOn(coreServiceSpy, 'showMessage');
      // Act
      const errorMessage = 'API call failed';
      spyOn(reportServiceSpy,'updateReport').and.returnValue(
        throwError({error:{message: errorMessage} })
      );
      component.qualifyReportService(file);
  
      expect(showMessageSpy).toHaveBeenCalledWith('Hubo un error calificando el reporte:API call failed');
    });
});
