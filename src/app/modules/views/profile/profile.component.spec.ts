import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from 'src/app/shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common';
import { AcademicFriendsService } from '../../services/academic-friends/academic-friends.service';
import { CoreService } from 'src/app/core/services/core/core.service';
import { DialogService } from 'src/app/shared/services/dialog/dialog.service';
import { of, throwError } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let academicFriendsService: AcademicFriendsService;
  let coreService: CoreService;
  let dialogService:DialogService
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule ,
        MatTabsModule,
        SharedModule,
        BrowserAnimationsModule,
      ],
      providers: [DatePipe],
    });
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
     academicFriendsService=TestBed.inject( AcademicFriendsService);
     coreService=TestBed.inject( CoreService);
     dialogService=TestBed.inject(DialogService)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit',()=>{
    spyOn(component,'getUserInfo')
    component.ngOnInit()
    expect(component.getUserInfo).toHaveBeenCalled();
  })
  it('getUserInfo',()=>{
    spyOn(academicFriendsService,'getAcademicFriendByEmail').and.returnValue(
      of({})
    )
    component.getUserInfo('example@ufps.edu.co')
    expect(academicFriendsService.getAcademicFriendByEmail).toHaveBeenCalled();
    
  })
  it('getUserInfo',()=>{
    spyOn(coreService,'showMessage')
    spyOn(academicFriendsService,'getAcademicFriendByEmail').and.returnValue(
      of(false)
    )
    component.getUserInfo('example@ufps.edu.co')
    expect(academicFriendsService.getAcademicFriendByEmail).toHaveBeenCalled();
    expect(coreService.showMessage).toHaveBeenCalled();
    
  })
  it('getUserInfo error',()=>{
    spyOn(coreService,'showMessage')
    spyOn(academicFriendsService,'getAcademicFriendByEmail').and.returnValue(
      throwError({message:'error'})
    )
    component.getUserInfo('example@ufps.edu.co')
    expect(academicFriendsService.getAcademicFriendByEmail).toHaveBeenCalled();
    //expect(coreService.showMessage).toHaveBeenCalled();
    
  })
  it('resetPasswordService',()=>{
    spyOn(coreService,'showMessage')
    spyOn(academicFriendsService,'resetPassword').and.returnValue(
      of({})
    )
    component.resetPasswordService({})
    expect(academicFriendsService.resetPassword).toHaveBeenCalled();
    expect(coreService.showMessage).toHaveBeenCalled();
    
  })

  it('resetPasswordService',()=>{
    spyOn(coreService,'showMessage')
    spyOn(academicFriendsService,'resetPassword').and.returnValue(
      throwError({})
    )
    component.resetPasswordService({})
    expect(academicFriendsService.resetPassword).toHaveBeenCalled();
    expect(coreService.showMessage).toHaveBeenCalled();
  })
  it('should call resetPasswordService when dialog is closed with a non-empty result', () => {
    // Configuración del espía para que devuelva un valor específico
    const dialogRefMock: Partial<MatDialogRef<any, any>> = {
      afterClosed: () => of({})
    };
    spyOn(dialogService,'openDynamicDialog').and.returnValue(dialogRefMock as MatDialogRef<any, any>)
    spyOn(component, 'resetPasswordService')
    // Llamar a la función que se va a probar
    component.openDialogReplyAssignment();

    // Verificar que se llamó a la función esperada
    expect(component.resetPasswordService).toHaveBeenCalled()
  });
  it('should call resetPasswordService when dialog is closed with a non-empty result', () => {
    // Configuración del espía para que devuelva un valor específico
    const dialogRefMock: Partial<MatDialogRef<any, any>> = {
      afterClosed: () => of('')
    };
    spyOn(dialogService,'openDynamicDialog').and.returnValue(dialogRefMock as MatDialogRef<any, any>)
    
    // Llamar a la función que se va a probar
    component.openDialogReplyAssignment();
  });
});
