import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { UploadReportComponent } from './upload-report/upload-report.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { UploadStudentsComponent } from './upload-students/upload-students.component';
import { RegisterCoordinatorComponent } from './register-coordinator/register-coordinator.component';
import { UploadCoursesComponent } from './upload-courses/upload-courses.component';
import { EnrollmentAcademicFriendComponent } from './enrollment-academic-friend/enrollment-academic-friend.component';
import { MatIconModule } from '@angular/material/icon';
import { AcademicFriendsComponent } from './academic-friends/academic-friends.component';
import { ConvocationCreateComponent } from './convocation-create/convocation-create.component';
import { ConsultancySaveComponent } from './consultancy-save/consultancy-save.component';
import { ConsultancyListComponent } from './consultancy-list/consultancy-list.component';
import {MatTabsModule} from '@angular/material/tabs';
import { ConvocationConsultComponent } from './convocation-consult/convocation-consult.component';
import { ReviewReportComponent } from './review-report/review-report.component';
import { ConvocationApprovalsComponent } from './convocation-approvals/convocation-approvals.component';
import { StatsComponent } from './stats/stats.component';
import { ScheduleAssignmentComponent } from './schedule-assignment/schedule-assignment.component';
@NgModule({
  declarations: [
    UploadReportComponent,
    UploadStudentsComponent,
    RegisterCoordinatorComponent,
    UploadCoursesComponent,
    EnrollmentAcademicFriendComponent,
    AcademicFriendsComponent,
    ConvocationCreateComponent,
    ConsultancySaveComponent,
    ConsultancyListComponent,
    ConvocationConsultComponent,
    ReviewReportComponent,
    ConvocationApprovalsComponent,
    StatsComponent,
    ScheduleAssignmentComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    MatIconModule,
    MatTabsModule
  ],
  providers:[
    DatePipe
  ]
})
export class AppModulesModule { }
