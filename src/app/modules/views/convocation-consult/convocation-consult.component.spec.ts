import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvocationConsultComponent } from './convocation-consult.component';
import { DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from 'src/app/shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConvocationService } from '../../services/convocation/convocation.service';
import { CoreService } from 'src/app/core/services/core/core.service';
import { AcademicFriendsService } from '../../services/academic-friends/academic-friends.service';
import { FileService } from '../../services/file/file.service';
import { DialogService } from 'src/app/shared/services/dialog/dialog.service';
import { of, throwError } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';

describe('ConvocationConsultComponent', () => {
  let component: ConvocationConsultComponent;
  let fixture: ComponentFixture<ConvocationConsultComponent>;
  let convocationService: ConvocationService;
  let coreService: CoreService;
  let academicFriendsService: AcademicFriendsService;
  let fileService: FileService;
  let dialogService: DialogService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConvocationConsultComponent],
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
        MatTabsModule,
        SharedModule,
        BrowserAnimationsModule,
      ],
      providers: [DatePipe],
    });
    fixture = TestBed.createComponent(ConvocationConsultComponent);
    component = fixture.componentInstance;
    convocationService = TestBed.inject(ConvocationService);
    coreService = TestBed.inject(CoreService);
    academicFriendsService = TestBed.inject(AcademicFriendsService);
    fileService = TestBed.inject(FileService);
    dialogService = TestBed.inject(DialogService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('getConvocationActiveService', () => {
    spyOn(convocationService, 'getConvocationActive').and.returnValue(of({}));
    spyOn(component, 'getRegisteredStudentsByActiveConvocationService');
    component.getConvocationActiveService();
    expect(
      component.getRegisteredStudentsByActiveConvocationService
    ).toHaveBeenCalled();
  });
  it('getConvocationActiveService error', () => {
    spyOn(convocationService, 'getConvocationActive').and.returnValue(
      throwError({ message: 'error' })
    );
    spyOn(coreService, 'showMessage');
    component.getConvocationActiveService();
    expect(coreService.showMessage).toHaveBeenCalled();
  });
  it('getRegisteredStudentsByActiveConvocationService', () => {
    spyOn(
      academicFriendsService,
      'getAcademicFriendByConvocationActive'
    ).and.returnValue(of([]));
    component.getRegisteredStudentsByActiveConvocationService(1);
  });
  it('getRegisteredStudentsByActiveConvocationService error', () => {
    spyOn(
      academicFriendsService,
      'getAcademicFriendByConvocationActive'
    ).and.returnValue(throwError({ message: 'error' }));
    spyOn(coreService, 'showMessage');
    component.getRegisteredStudentsByActiveConvocationService(1);
    expect(coreService.showMessage).toHaveBeenCalledWith(
      'Error al obtener estudiantes: error'
    );
  });
  // Calls downloadFileService method with the resume file url when event id is 'downloadHV'
  it('should call downloadFileService with resume file url when event id is "downloadHV"', () => {
    const event = { id: 'downloadHV', element: { resume: 'resumeUrl' } };
    spyOn(component, 'downloadFileService');

    component.handleCustomEvent(event);

    expect(component.downloadFileService).toHaveBeenCalledWith('resumeUrl');
  });
  // Calls downloadFileService method with the contract file url when event id is 'downloadContract'
  it('should call downloadFileService with contract file url when event id is "downloadContract"', () => {
    const event = {
      id: 'downloadContract',
      element: { contract: 'contractUrl' },
    };
    spyOn(component, 'downloadFileService');

    component.handleCustomEvent(event);

    expect(component.downloadFileService).toHaveBeenCalledWith('contractUrl');
  });
  // Calls openDialogQualifyStudent method when event id is 'qualify'
  it('should call openDialogQualifyStudent when event id is "qualify"', () => {
    const event = {
      id: 'qualify',
      element: { email: 'test@example.com', status: 'pending' },
    };
    spyOn(component, 'openDialogQualifyStudent');

    component.handleCustomEvent(event);

    expect(component.openDialogQualifyStudent).toHaveBeenCalledWith(event);
  });
  it('qualifyStudentService', () => {
    spyOn(
      academicFriendsService,
      'updateAcademicFriend'
    ).and.returnValue(of([]));
    component.qualifyStudentService({});
  });
  it('qualifyStudentService error', () => {
    spyOn(
      academicFriendsService,
      'updateAcademicFriend'
    ).and.returnValue(throwError({ message: 'error' }));
    spyOn(coreService, 'showMessage');
    component.qualifyStudentService({});
    expect(coreService.showMessage).toHaveBeenCalledWith(
      'Hubo un error al calificar:error'
    );
  });
  it('should call qualifyStudentService when dialog is closed with a non-empty result', () => {
    // Configuración del espía para que devuelva un valor específico
    const dialogRefMock: Partial<MatDialogRef<any, any>> = {
      afterClosed: () => of({ contract: 'path/to/contract' })
    };
    spyOn(dialogService,'openDynamicDialog').and.returnValue(dialogRefMock as MatDialogRef<any, any>)
    spyOn(component, 'qualifyStudentService')
    // Llamar a la función que se va a probar
    component.openDialogQualifyStudent({ element: { email: 'test@example.com' } });

    // Verificar que se llamó a la función esperada
    expect(component.qualifyStudentService).toHaveBeenCalled();
  });
  it('should not call qualifyStudentService when dialog is closed with a empty result', () => {
    // Configuración del espía para que devuelva un valor específico
    const dialogRefMock: Partial<MatDialogRef<any, any>> = {
      afterClosed: () => of('')
    };
    spyOn(dialogService,'openDynamicDialog').and.returnValue(dialogRefMock as MatDialogRef<any, any>)
    spyOn(component, 'qualifyStudentService')
    // Llamar a la función que se va a probar
    component.openDialogQualifyStudent({ element: { email: 'test@example.com' } });

    // Verificar que se llamó a la función esperada
    expect(component.qualifyStudentService).not.toHaveBeenCalled();
  });
  it('should download a file successfully', async () => {
    // Arrange
    const fileUrl = 'example.com/download/file';
    const mockBlob = new Blob(['file content'], {
      type: 'application/octet-stream',
    });
    const downloadFileSpy = spyOn(fileService, 'downloadFile').and.returnValue(
      of(mockBlob)
    );

    // Act
    await component.downloadFileService(fileUrl);
    fixture.detectChanges();

    // Assert
    expect(downloadFileSpy).toHaveBeenCalledWith(fileUrl);
  });
  it('should show error message after wont be able to downloading a file', () => {
    const errorMessage = 'API call failed';
    const fileUrl = 'example.com/download/file';
    spyOn(fileService, 'downloadFile').and.returnValue(
      throwError({ message: errorMessage})
    );
    const showMessageSpy = spyOn(coreService, 'showMessage');
    component.downloadFileService(fileUrl);

    expect(showMessageSpy).toHaveBeenCalledWith(
      'Hubo un error descargando el archivo:' + errorMessage
    );
  });
});
