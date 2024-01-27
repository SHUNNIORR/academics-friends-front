import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollmentAcademicFriendComponent } from './enrollment-academic-friend.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from 'src/app/shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common';
import { ConvocationService } from '../../services/convocation/convocation.service';
import { of, throwError } from 'rxjs';
import { CoreService } from 'src/app/core/services/core/core.service';
import { EnrollmentService } from '../../services/enrollment/enrollment.service';
import { EnrollStudentRequest } from '../../models/Student';

describe('EnrollmentAcademicFriendComponent', () => {
  let component: EnrollmentAcademicFriendComponent;
  let fixture: ComponentFixture<EnrollmentAcademicFriendComponent>;
  let convocationService : ConvocationService;
  let coreService:CoreService;
  let enrollmentService:EnrollmentService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnrollmentAcademicFriendComponent],
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule ,
        MatTabsModule,
        SharedModule,
        BrowserAnimationsModule,
      ],
      providers: [DatePipe],
    });
    fixture = TestBed.createComponent(EnrollmentAcademicFriendComponent);
    component = fixture.componentInstance;
    convocationService = TestBed.inject(ConvocationService)
    coreService = TestBed.inject(CoreService);
    enrollmentService = TestBed.inject(EnrollmentService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onFormSubmit',()=>{
    spyOn(component,'enrollStudent')
    component.onFormSubmit({});

    expect(component.enrollStudent).toHaveBeenCalled();
  })

  it('getConvocationActive',()=>{
    spyOn(convocationService,'getConvocationActive').and.returnValue(
      of({})
    )
    component.getConvocationActiveService();

    //expect(convocationService.getConvocationActive).toHaveBeenCalled();
  })
  it('getConvocationActive error',()=>{
    spyOn(coreService,'showMessage')
    spyOn(convocationService,'getConvocationActive').and.returnValue(
      throwError({message:'error'})
    )
    component.getConvocationActiveService();

    //expect(convocationService.getConvocationActive).toHaveBeenCalled();
  })
  it('getConvocationActive',()=>{
    spyOn(enrollmentService,'enrollStudent').and.returnValue(
      of({})
    )
    component.enrollStudent({}as EnrollStudentRequest);

    //expect(convocationService.getConvocationActive).toHaveBeenCalled();
  })
  it('getConvocationActive error',()=>{
    spyOn(coreService,'showMessage')
    spyOn(enrollmentService,'enrollStudent').and.returnValue(
      throwError({error:{message:'error'}})
    )
    component.enrollStudent({}as EnrollStudentRequest);

    //expect(convocationService.getConvocationActive).toHaveBeenCalled();
  })
});
