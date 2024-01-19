import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadStudentsComponent } from './upload-students.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from 'src/app/shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common';
import { StudentsService } from '../../services/students/students.service';
import { CoreService } from 'src/app/core/services/core/core.service';
import { of, throwError } from 'rxjs';

describe('UploadStudentsComponent', () => {
  let component: UploadStudentsComponent;
  let fixture: ComponentFixture<UploadStudentsComponent>;
  let studentsService: StudentsService;
  let coreService: CoreService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UploadStudentsComponent],
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
        MatTabsModule,
        SharedModule,
        BrowserAnimationsModule,
      ],
      providers: [DatePipe],
    });
    fixture = TestBed.createComponent(UploadStudentsComponent);
    component = fixture.componentInstance;
     studentsService= TestBed.inject(StudentsService);
   coreService= TestBed.inject(CoreService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('searchStudentService', () => {
    spyOn(
      studentsService,
      'searchStudent'
    ).and.returnValue(of([]));
    component.searchStudentService('1');
  });
  
  it('searchStudentService error', () => {
    spyOn(
      studentsService,
      'searchStudent'
    ).and.returnValue(throwError({ message: 'error' }));
    component.searchStudentService('1');
  });
  it('createStudents', () => {
    spyOn(
      studentsService,
      'createStudents'
    ).and.returnValue(of([]));
    component.createStudents(new File([],''));
  });
  
  it('createStudents error', () => {
    spyOn(
      studentsService,
      'createStudents'
    ).and.returnValue(throwError({ message: 'error' }));
    component.createStudents(new File([],''));
  });
  it('onFormSubmit', () => {
    spyOn(component,'createStudents')
    component.onFormSubmit(new File([],''));
    expect(component.createStudents).toHaveBeenCalled()
  });
  it('onSearchStudent', () => {
    spyOn(component,'searchStudentService')
    component.onSearchStudent(new File([],''));
    expect(component.searchStudentService).toHaveBeenCalled()
  });
});
