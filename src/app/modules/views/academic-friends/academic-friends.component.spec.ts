import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { AcademicFriendsComponent } from './academic-friends.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from 'src/app/shared/shared.module';
import { ConsultancyService } from '../../services/consultancy/consultancy.service';
import { CoreService } from 'src/app/core/services/core/core.service';
import { Observable, of, throwError } from 'rxjs';
import { AcademicFriendsService } from '../../services/academic-friends/academic-friends.service';
import { FileService } from '../../services/file/file.service';
import { UPLOAD_CONTRACT } from '../../metadata/academic-friend/academic-friend.metadata';
import { DialogService } from 'src/app/shared/services/dialog/dialog.service';

describe('AcademicFriendsComponent', () => {
  let component: AcademicFriendsComponent;
  let fixture: ComponentFixture<AcademicFriendsComponent>;
  let consultancyService: ConsultancyService;
  let coreService: CoreService;
  let academicFriendService: AcademicFriendsService;
  let fileService: FileService;
  let dialogService: DialogService;
  let matDialogMock: jasmine.SpyObj<MatDialog>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AcademicFriendsComponent],
      imports: [
        MatSidenavModule,
        BrowserAnimationsModule,
        MatListModule,
        MatExpansionModule,
        RouterModule,
        HttpClientTestingModule,
        MatSnackBarModule,
        MatDialogModule,
        MatTabsModule,
        SharedModule,
      ],
      providers: [
        {
          provide: MatDialog,
          useValue: jasmine.createSpyObj('MatDialog', [
            'open',
            'openDynamicDialog',
          ]),
        },
      ],
    });
    fixture = TestBed.createComponent(AcademicFriendsComponent);
    consultancyService = TestBed.inject(ConsultancyService);
    coreService = TestBed.inject(CoreService);
    academicFriendService = TestBed.inject(AcademicFriendsService);
    fileService = TestBed.inject(FileService);
    dialogService = TestBed.inject(DialogService);
    component = fixture.componentInstance;
    matDialogMock = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  // Calls 'getAcademicFriendByCode' method with the provided academic friend code from the form data.
  it('should call getAcademicFriendByCode method with the provided academic friend code', () => {
    const formData = { academicFriendCode: 123 };
    spyOn(component, 'getAcademicFriendByCode');

    component.getAfInfo(formData);

    expect(component.getAcademicFriendByCode).toHaveBeenCalledWith(
      formData.academicFriendCode
    );
  });
  // Retrieves all consultancies for a given academic friend email
  it('should retrieve all consultancies for a given academic friend email', () => {
    // Arrange
    const event = { academicFriendEmail: 'example@ufps.edu.co' };
    spyOn(component, 'getConsultancyByEmail');

    component.getConsultancyByAf(event);

    expect(component.getConsultancyByEmail).toHaveBeenCalledWith(
      event.academicFriendEmail
    );
  });
  it('should call getAllConsultancyByEmail method and subscribe to it', () => {
    const email = 'test@example.com';
    const getAllConsultancyByEmailSpy = spyOn(
      consultancyService,
      'getAllConsultancyByEmail'
    ).and.returnValue(of([]));
    component.getConsultancyByEmail(email);
    expect(getAllConsultancyByEmailSpy).toHaveBeenCalledWith(email);
  });
  it('should set consultancyByAFtableData property to the result of the API call if it is not null', () => {
    const email = 'test@example.com';
    const response = [{ id: 1, name: 'Consultancy 1' }];
    spyOn(consultancyService, 'getAllConsultancyByEmail').and.returnValue(
      of(response)
    );
    component.getConsultancyByEmail(email);
    expect(component.consultancyByAFtableData).toEqual(response);
  });
  it('should set consultancyByAFtableData property to an empty array if the result of the API call is null', () => {
    const email = 'test@example.com';
    spyOn(consultancyService, 'getAllConsultancyByEmail').and.returnValue(
      of(null as any)
    );
    component.getConsultancyByEmail(email);
    expect(component.consultancyByAFtableData).toEqual([]);
  });
  it('should show a message with the error message if the API call fails', () => {
    const email = 'test@example.com';
    const errorMessage = 'API call failed';
    spyOn(consultancyService, 'getAllConsultancyByEmail').and.returnValue(
      throwError({ error: { message: errorMessage } })
    );
    const showMessageSpy = spyOn(coreService, 'showMessage');
    component.getConsultancyByEmail(email);
    expect(showMessageSpy).toHaveBeenCalledWith(
      'Hubo un error: ' + errorMessage
    );
  });
  // Should call the 'findAcademicFriendByCode' method of the 'academicFriendsService' with the provided code and subscribe to it
  it('should call findAcademicFriendByCode method with provided code and subscribe to it', () => {
    // Arrange
    const code = 123;
    const academicFriendsServiceSpy = spyOn(
      academicFriendService,
      'findAcademicFriendByCode'
    ).and.returnValue(of(null as any));

    // Act
    component.getAcademicFriendByCode(code);

    // Assert
    expect(academicFriendsServiceSpy).toHaveBeenCalledWith(code);
  });
  it('should push the response to findAFByCodetableData array if it is not null', () => {
    // Arrange
    const code = 123;
    const response = { name: 'John Doe', status:'pass'};
    spyOn(academicFriendService, 'findAcademicFriendByCode').and.returnValue(
      of(response)
    );

    // Act
    component.getAcademicFriendByCode(code);

    // Assert
    expect(component.findAFByCodetableData).toContain(response);
  });
  it('should show a message with the error message if the API call fails', () => {
    const code = 123;
    const errorMessage = 'API call failed';
    spyOn(academicFriendService, 'findAcademicFriendByCode').and.returnValue(
      throwError({ error: { message: errorMessage } })
    );
    const showMessageSpy = spyOn(coreService, 'showMessage');
    component.getAcademicFriendByCode(code);
    expect(showMessageSpy).toHaveBeenCalledWith(
      'Hubo un error: ' + errorMessage
    );
  });
  it('should set allAftableData property to the result of the API call if it is not null', () => {
    const response = [{ id: 1, name: 'Academic Friend 1', status: 'pass' }];
    spyOn(academicFriendService, 'getAllAcademicFriends').and.returnValue(
      of(response)
    );

    component.getAllAcademicFriends();

    expect(component.allAftableData).toEqual(response);
  });
  it('should set allAftableData property to the result of the API call if it is not null', () => {
    const response = [{ id: 1, name: 'Academic Friend 1', status: 'pass' }];
    const errorMessage = 'API call failed';
    spyOn(academicFriendService, 'getAllAcademicFriends').and.returnValue(
      throwError({ error: { message: errorMessage } })
    );
    const showMessageSpy = spyOn(coreService, 'showMessage');
    component.getAllAcademicFriends();

    expect(showMessageSpy).toHaveBeenCalledWith(
      'Hubo un error: ' + errorMessage
    );
  });
  // Calls downloadFileService method with resume fileUrl when event id is 'downloadHV'
  it('should call downloadFileService with resume fileUrl when event id is "downloadHV"', () => {
    const event = {
      id: 'downloadHV',
      element: {
        resume: 'resumeUrl',
      },
    };
    spyOn(component, 'downloadFileService');

    component.handleCustomEvent(event);

    expect(component.downloadFileService).toHaveBeenCalledWith('resumeUrl');
  });
  // Calls downloadFileService method with contract fileUrl when event id is 'downloadContract'
  it('should call downloadFileService with contract fileUrl when event id is "downloadContract"', () => {
    const event = {
      id: 'downloadContract',
      element: {
        contract: 'contractUrl',
      },
    };
    spyOn(component, 'downloadFileService');

    component.handleCustomEvent(event);

    expect(component.downloadFileService).toHaveBeenCalledWith('contractUrl');
  });
  it('should call openDialogUploadContract when event id is "uploadContract"', () => {
    const event = {
      id: 'uploadContract',
      element: {},
    };
    spyOn(component, 'openDialogUploadContract');

    component.handleCustomEvent(event);

    expect(component.openDialogUploadContract).toHaveBeenCalledWith(event);
  });
  //---FUNCION DE DESCARGAR ARCHIVO
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

  it('should show success message after downloading a file', async () => {
    const fileUrl = 'example.com/download/file';
    const mockBlob = new Blob(['file content'], {
      type: 'application/octet-stream',
    });
    spyOn(fileService, 'downloadFile').and.returnValue(of(mockBlob));
    spyOn(coreService, 'showMessage');
    // Act
    await component.downloadFileService(fileUrl);
    fixture.detectChanges();

    // Assert
    expect(coreService.showMessage).toHaveBeenCalled();
  });
  it('should show error message after wont be able to downloading a file', () => {
    const errorMessage = 'API call failed';
    const fileUrl = 'example.com/download/file';
    spyOn(fileService, 'downloadFile').and.returnValue(
      throwError({ message: errorMessage })
    );
    const showMessageSpy = spyOn(coreService, 'showMessage');
    component.downloadFileService(fileUrl);

    expect(showMessageSpy).toHaveBeenCalledWith(
      'Hubo un error descargando el archivo:' + errorMessage
    );
  });

  // Opens a dialog with the title 'Cargar contrato' and a form containing a file input field labeled 'Cargar contrato'
  it('should call uploadContractStudentService when dialog is closed with a non-empty result', () => {
    // Configuración del espía para que devuelva un valor específico
    const dialogRefMock: Partial<MatDialogRef<any, any>> = {
      afterClosed: () => of({ contract: 'path/to/contract' }),
    };
    spyOn(dialogService, 'openDynamicDialog').and.returnValue(
      dialogRefMock as MatDialogRef<any, any>
    );
    spyOn(component, 'uploadContractStudentService');
    // Llamar a la función que se va a probar
    component.openDialogUploadContract({
      element: { email: 'test@example.com' },
    });

    // Verificar que se llamó a la función esperada
    expect(component.uploadContractStudentService).toHaveBeenCalledWith(
      'path/to/contract',
      'test@example.com'
    );
  });
  it('should call uploadContractStudentService when dialog is closed with a non-empty result', () => {
    // Configuración del espía para que devuelva un valor específico
    const dialogRefMock: Partial<MatDialogRef<any, any>> = {
      afterClosed: () => of(''),
    };
    spyOn(dialogService, 'openDynamicDialog').and.returnValue(
      dialogRefMock as MatDialogRef<any, any>
    );
    spyOn(component, 'uploadContractStudentService');
    // Llamar a la función que se va a probar
    component.openDialogUploadContract({
      element: { email: 'test@example.com' },
    });

    // Verificar que se llamó a la función esperada
    expect(component.uploadContractStudentService).not.toHaveBeenCalled();
  });

  it('should handle successful contract upload', () => {
    // Configuración del espía para que devuelva un observable con éxito
    spyOn(academicFriendService, 'uploadContract').and.returnValue(
      of('success')
    );
    spyOn(component, 'getAllAcademicFriends');
    spyOn(coreService, 'showMessage');
    // Llamar a la función que se va a probar
    component.uploadContractStudentService(
      'path/to/contract',
      'test@example.com'
    );

    // Verificar que se llamó a las funciones esperadas
    expect(component.getAllAcademicFriends).toHaveBeenCalled();
    expect(coreService.showMessage).toHaveBeenCalledWith(
      'Contrato cargado con éxito'
    );
  });
  it('should show error message after wont be able to upload a contract', () => {
    const errorResponse = { error: { message: 'Error uploading contract' } };
    spyOn(academicFriendService, 'uploadContract').and.returnValue(
      throwError(errorResponse)
    );
    const showMessageSpy = spyOn(coreService, 'showMessage');
    component.uploadContractStudentService(
      'path/to/contract',
      'test@example.com'
    );

    expect(showMessageSpy).toHaveBeenCalledWith(
      'Hubo un error al cargar el contrato:Error uploading contract'
    );
  });
});
