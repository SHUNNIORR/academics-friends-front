import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { LoginComponent } from './core/auth/login/login.component';
import { MainComponent } from './layouts/main/main.component';
import { authGuardGuard } from './core/guards/auth-guard.guard';
import { HomeComponent } from './modules/views/home/home.component';
import { UploadReportComponent } from './modules/views/upload-report/upload-report.component';
import { UploadStudentsComponent } from './modules/views/upload-students/upload-students.component';
import { RegisterCoordinatorComponent } from './modules/views/register-coordinator/register-coordinator.component';
import { UploadCoursesComponent } from './modules/views/upload-courses/upload-courses.component';
import { EnrollmentAcademicFriendComponent } from './modules/views/enrollment-academic-friend/enrollment-academic-friend.component';
import { AcademicFriendsComponent } from './modules/views/academic-friends/academic-friends.component';
import { ConvocationCreateComponent } from './modules/views/convocation-create/convocation-create.component';
import { ConsultancySaveComponent } from './modules/views/consultancy-save/consultancy-save.component';
import { ConsultancyListComponent } from './modules/views/consultancy-list/consultancy-list.component';
import { ConvocationConsultComponent } from './modules/views/convocation-consult/convocation-consult.component';
import { ReviewReportComponent } from './modules/views/review-report/review-report.component';
import { ConvocationApprovalsComponent } from './modules/views/convocation-approvals/convocation-approvals.component';
import { StatsComponent } from './modules/views/stats/stats.component';
import { ScheduleAssignmentComponent } from './modules/views/schedule-assignment/schedule-assignment.component';
import { ProfileComponent } from './modules/views/profile/profile.component';
import { ForgotPasswordComponent } from './core/auth/forgot-password/forgot-password.component';

const routes: Routes = [
  { path:'', redirectTo:'/login', pathMatch:'full'},
  { path:'inscripcion', component: EnrollmentAcademicFriendComponent},
  { path:'login', component: LoginComponent,  },
  { path:'forgot-password', component: ForgotPasswordComponent,  },
  { path:'dashboard', component: MainComponent, canActivate:[],
    children: [
      { path: '', redirectTo: 'bienvenidos', pathMatch: 'full' },
      { path: 'bienvenidos',  component: HomeComponent, canActivate:[authGuardGuard], data: { expectedRole: ['academicFriend','coordinator','director'] }},
      { path: 'cargar-informes',  component: UploadReportComponent, canActivate:[authGuardGuard], data: { expectedRole: ['academicFriend'] }},
      { path: 'cargar-estudiantes',  component: UploadStudentsComponent, canActivate:[authGuardGuard], data: { expectedRole: ['director'] }},
      { path: 'registro-coordinadores',  component: RegisterCoordinatorComponent, canActivate:[authGuardGuard], data: { expectedRole: ['director'] }},
      { path: 'cargar-cursos',  component: UploadCoursesComponent, canActivate:[authGuardGuard], data: { expectedRole: ['director'] }},
      { path: 'asesorias/listar',  component: ConsultancyListComponent, canActivate:[authGuardGuard], data: { expectedRole: ['academicFriend'] }},
      { path: 'asesorias/registrar',  component: ConsultancySaveComponent, canActivate:[authGuardGuard], data: { expectedRole: ['academicFriend'] }},
      { path: 'convocatoria-crear',  component: ConvocationCreateComponent, canActivate:[authGuardGuard], data: { expectedRole: ['coordinator','director'] }},
      { path: 'convocatoria-consultar',  component: ConvocationConsultComponent, canActivate:[authGuardGuard], data: { expectedRole: ['coordinator','director'] }},
      { path: 'convocatoria-aprobar',  component: ConvocationApprovalsComponent, canActivate:[authGuardGuard], data: { expectedRole: ['coordinator','director'] }},
      { path: 'amigos-academicos',  component: AcademicFriendsComponent, canActivate:[authGuardGuard], data: { expectedRole: ['coordinator','director'] }},
      { path: 'informes-revisar',  component: ReviewReportComponent, canActivate:[authGuardGuard], data: { expectedRole: ['coordinator'] }},
      { path: 'asignar-horarios',  component: ScheduleAssignmentComponent, canActivate:[authGuardGuard], data: { expectedRole:['coordinator','academicFriend'] }},
      { path: 'estadisticas',  component: StatsComponent, canActivate:[authGuardGuard], data: { expectedRole: ['coordinator','director']}},
      { path: 'perfil',  component: ProfileComponent, canActivate:[authGuardGuard], data: { expectedRole: ['academicFriend','coordinator','director'] }}
    ]
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:false})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
