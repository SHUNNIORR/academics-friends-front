import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { UploadReportComponent } from './views/upload-report/upload-report.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { UploadStudentsComponent } from './views/upload-students/upload-students.component';
import { RegisterCoordinatorComponent } from './views/register-coordinator/register-coordinator.component';
import { UploadCoursesComponent } from './views/upload-courses/upload-courses.component';
import { EnrollmentAcademicFriendComponent } from './views/enrollment-academic-friend/enrollment-academic-friend.component';
import { MatIconModule } from '@angular/material/icon';
import { AcademicFriendsComponent } from './views/academic-friends/academic-friends.component';
import { ConvocationCreateComponent } from './views/convocation-create/convocation-create.component';
import { ConsultancySaveComponent } from './views/consultancy-save/consultancy-save.component';
import { ConsultancyListComponent } from './views/consultancy-list/consultancy-list.component';
import {MatTabsModule} from '@angular/material/tabs';
import { ConvocationConsultComponent } from './views/convocation-consult/convocation-consult.component';
import { ReviewReportComponent } from './views/review-report/review-report.component';
import { ConvocationApprovalsComponent } from './views/convocation-approvals/convocation-approvals.component';
import { StatsComponent } from './views/stats/stats.component';
import { ScheduleAssignmentComponent } from './views/schedule-assignment/schedule-assignment.component';
import { CalendarComponent } from './views/calendar/calendar.component';
import { ProfileComponent } from './views/profile/profile.component';
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
    CalendarComponent,
    ProfileComponent,
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
