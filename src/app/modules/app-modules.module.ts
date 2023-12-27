import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadReportComponent } from './upload-report/upload-report.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { UploadStudentsComponent } from './upload-students/upload-students.component';
import { RegisterCoordinatorComponent } from './register-coordinator/register-coordinator.component';
import { UploadCoursesComponent } from './upload-courses/upload-courses.component';
import { EnrollmentAcademicFriendComponent } from './enrollment-academic-friend/enrollment-academic-friend.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    UploadReportComponent,
    UploadStudentsComponent,
    RegisterCoordinatorComponent,
    UploadCoursesComponent,
    EnrollmentAcademicFriendComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    MatIconModule
  ]
})
export class AppModulesModule { }
