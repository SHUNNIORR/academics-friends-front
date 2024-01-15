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

const routes: Routes = [
  { path:'', redirectTo:'/login', pathMatch:'full'},
  { path:'inscripcion', component: EnrollmentAcademicFriendComponent},
  { path:'login', component: LoginComponent,  },
  { path:'dashboard', component: MainComponent, canActivate:[],
    children: [
      { path: '', redirectTo: 'bienvenidos', pathMatch: 'full' },
      { path: 'bienvenidos',  component: HomeComponent, canActivate:[authGuardGuard]},
      { path: 'cargar-informes',  component: UploadReportComponent, canActivate:[authGuardGuard]},
      { path: 'cargar-estudiantes',  component: UploadStudentsComponent, canActivate:[authGuardGuard]},
      { path: 'registro-coordinadores',  component: RegisterCoordinatorComponent, canActivate:[authGuardGuard]},
      { path: 'cargar-cursos',  component: UploadCoursesComponent, canActivate:[authGuardGuard]},
      { path: 'asesorias/listar',  component: ConsultancyListComponent, canActivate:[authGuardGuard]},
      { path: 'asesorias/registrar',  component: ConsultancySaveComponent, canActivate:[authGuardGuard]},
      { path: 'convocatoria-crear',  component: ConvocationCreateComponent, canActivate:[authGuardGuard]},
      { path: 'convocatoria-consultar',  component: ConvocationConsultComponent, canActivate:[authGuardGuard]},
      { path: 'convocatoria-aprobar',  component: ConvocationApprovalsComponent, canActivate:[authGuardGuard]},
      { path: 'amigos-academicos',  component: AcademicFriendsComponent, canActivate:[authGuardGuard]},
      { path: 'informes-revisar',  component: ReviewReportComponent, canActivate:[authGuardGuard]},
      { path: 'asignar-horarios',  component: ScheduleAssignmentComponent, canActivate:[authGuardGuard]},
      { path: 'estadisticas',  component: StatsComponent, canActivate:[authGuardGuard]},
      { path: 'perfil',  component: ProfileComponent, canActivate:[authGuardGuard]}
    ]
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
