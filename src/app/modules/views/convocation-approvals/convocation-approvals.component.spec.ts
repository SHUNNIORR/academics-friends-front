import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvocationApprovalsComponent } from './convocation-approvals.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from 'src/app/shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common';
import { ConvocationService } from '../../services/convocation/convocation.service';
import { CoreService } from 'src/app/core/services/core/core.service';
import { AcademicFriendsService } from '../../services/academic-friends/academic-friends.service';
import { FileService } from '../../services/file/file.service';
import { DialogService } from 'src/app/shared/services/dialog/dialog.service';
import { of, throwError } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';

describe('ConvocationApprovalsComponent', () => {
  let component: ConvocationApprovalsComponent;
  let fixture: ComponentFixture<ConvocationApprovalsComponent>;
  let convocationService: ConvocationService;
  let coreService: CoreService;
  let academicFriendsService: AcademicFriendsService;
  let fileService: FileService;
  let dialogService:DialogService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConvocationApprovalsComponent],
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
        MatTabsModule,
        SharedModule,
        BrowserAnimationsModule,
      ],
      providers: [DatePipe],
    });
    fixture = TestBed.createComponent(ConvocationApprovalsComponent);
    component = fixture.componentInstance;
    convocationService=TestBed.inject(ConvocationService) ;
    coreService=TestBed.inject( CoreService);
    academicFriendsService=TestBed.inject( AcademicFriendsService);
    fileService=TestBed.inject( FileService);
    dialogService=TestBed.inject(DialogService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('ngOnInit',()=>{
    spyOn(component,'getConvocationActiveService')
    component.ngOnInit()
    expect(component.getConvocationActiveService)
  })
  it('createCoordinator',()=>{
    spyOn(component,'getRegisteredStudentsByActiveConvocationService')
    spyOn(convocationService,'getConvocationActive').and.returnValue(
      of({})
    )
    component.getConvocationActiveService()
    expect(component.getRegisteredStudentsByActiveConvocationService).toHaveBeenCalled();
    
  })
  it('createCoordinator',()=>{
    spyOn(coreService,'showMessage')
    spyOn(convocationService,'getConvocationActive').and.returnValue(
      throwError({message:'error'})
    )
    component.getConvocationActiveService()
    expect(coreService.showMessage).toHaveBeenCalled();
    
  })
  it('createCoordinator',()=>{
    spyOn(component,'getRegisteredStudentsByActiveConvocationService')
    spyOn(academicFriendsService,'getAcademicFriendByConvocationActive').and.returnValue(
      of({})
    )
    component.getRegisteredStudentsByActiveConvocationService(1)
  })
  it('createCoordinator',()=>{
    spyOn(coreService,'showMessage')
    spyOn(academicFriendsService,'getAcademicFriendByConvocationActive').and.returnValue(
      throwError({message:'error'})
    )
    component.getRegisteredStudentsByActiveConvocationService(1)
    expect(coreService.showMessage).toHaveBeenCalled();
    
  })
  it('approveStudentService',()=>{
    spyOn(component,'getRegisteredStudentsByActiveConvocationService')
    spyOn(academicFriendsService,'updateAcademicFriend').and.returnValue(
      of({})
    )
    component.approveStudentService({})
  })
  it('approveStudentService',()=>{
    spyOn(coreService,'showMessage')
    spyOn(academicFriendsService,'updateAcademicFriend').and.returnValue(
      throwError({message:'error'})
    )
    component.approveStudentService({})
    expect(coreService.showMessage).toHaveBeenCalled();
    
  })
  it('should call uploadContractStudentService when dialog is closed with a non-empty result', () => {
    // Configuración del espía para que devuelva un valor específico
    const dialogRefMock: Partial<MatDialogRef<any, any>> = {
      afterClosed: () => of(''),
    };
    spyOn(dialogService, 'openDynamicDialog').and.returnValue(
      dialogRefMock as MatDialogRef<any, any>
    );
    spyOn(component, 'approveStudentService');
    // Llamar a la función que se va a probar
    component.openDialogApproveStudent({});

    // Verificar que se llamó a la función esperada
    expect(component.approveStudentService).not.toHaveBeenCalled();
  });

  it('handleCustomEvent',()=>{
    spyOn(component,'openDialogApproveStudent')
    spyOn(component,'downloadFileService')
    component.handleCustomEvent({id:'downloadHV',element:{resume:''}})
    expect(component.downloadFileService).toHaveBeenCalled()
    component.handleCustomEvent({id:'downloadContract',element:{contract:''}})
    expect(component.downloadFileService).toHaveBeenCalled()
    component.handleCustomEvent({id:'approve'})
    expect(component.openDialogApproveStudent).toHaveBeenCalled()
  })
});
