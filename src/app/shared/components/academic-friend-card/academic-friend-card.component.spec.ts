import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicFriendCardComponent } from './academic-friend-card.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CoreService } from 'src/app/core/services/core/core.service';
import { FileService } from 'src/app/modules/services/file/file.service';
import { DialogService } from '../../services/dialog/dialog.service';
import { ReportService } from 'src/app/modules/services/report/report.service';
import { inject } from '@angular/core';
import { of, throwError } from 'rxjs';
import { UPDATE_REPORT_AACA } from 'src/app/modules/metadata/upload-report/upload-report.metadata';

describe('AcademicFriendCardComponent', () => {
  let component: AcademicFriendCardComponent;
  let fixture: ComponentFixture<AcademicFriendCardComponent>;
  let coreService: CoreService;
   let fileService: FileService;
   let dialog: MatDialog;
   let dialogService: DialogService;
   let reportService: ReportService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        MatSnackBarModule,
        HttpClientTestingModule,
        MatDialogModule
      ],
      declarations: [AcademicFriendCardComponent]
    });
    fixture = TestBed.createComponent(AcademicFriendCardComponent);
    component = fixture.componentInstance;
    coreService = TestBed.inject( CoreService);
    fileService = TestBed.inject( FileService);
    dialog = TestBed.inject( MatDialog);
    dialogService = TestBed.inject( DialogService);
    reportService = TestBed.inject( ReportService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should download file successfully', () => {
    const fileUrl = 'valid_file_url';
    const blob = new Blob(['dummy content'], { type: 'application/octet-stream' });
    spyOn(fileService,'downloadFile').and.returnValue(of(blob));
    spyOn(coreService,'showMessage')
    component.downloadReport(fileUrl);

    expect(fileService.downloadFile).toHaveBeenCalledWith(fileUrl);
    expect(coreService.showMessage).toHaveBeenCalledWith('Archivo descargado con éxito');
  });
  it('should download file successfully', () => {
    const fileUrl = 'valid_file_url';
    const blob = new Blob(['dummy content'], { type: 'application/octet-stream' });
    spyOn(fileService,'downloadFile').and.returnValue(
      throwError({ message: 'ERROR'  })
    );
    spyOn(coreService,'showMessage')
    component.downloadReport(fileUrl);

    expect(coreService.showMessage).toHaveBeenCalledWith('Hubo un error descargando el archivo:ERROR');
  });
  it('should open dialog for correcting report', () => {
    const formData = UPDATE_REPORT_AACA;
    const reportId = 1;
    const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of({ file: new File([], 'dummy.txt') }) });
    spyOn(dialogService,'openDynamicDialog').and.returnValue(dialogRefSpyObj);
    spyOn(component,'correctReportService')
    spyOn(coreService,'showMessage')
    component.openDialogCorrectReport(reportId);

    expect(dialogService.openDynamicDialog).toHaveBeenCalledOnceWith(
      'Corregir informe de asesorias',
      formData
    );

    expect(component.correctReportService).toHaveBeenCalledWith(reportId, new File([], 'dummy.txt'));
  });

  it('should open dialog for correcting report', () => {
    const formData = UPDATE_REPORT_AACA;
    const reportId = 1;
    spyOn(reportService,'correctReport').and.returnValue(of({}))
    spyOn(coreService,'showMessage')
    component.correctReportService(reportId,new File([], 'dummy.txt'));

    expect(coreService.showMessage).toHaveBeenCalledWith('Reporte corregido correctamente!');
  });

  it('should open dialog for correcting report', () => {
    const formData = UPDATE_REPORT_AACA;
    const reportId = 1;
    spyOn(reportService,'correctReport').and.returnValue(
      throwError({ message: 'ERROR'  })
    )
    spyOn(coreService,'showMessage')
    component.correctReportService(reportId,new File([], 'dummy.txt'));

    expect(coreService.showMessage).toHaveBeenCalledWith('Hubo un error actualizando el reporte:ERROR');
  });
  
});
