import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { LoginComponent } from './core/auth/login/login.component';
import { MainComponent } from './layouts/main/main.component';
import { authGuardGuard } from './core/guards/auth-guard.guard';
import { HomeComponent } from './modules/home/home.component';
import { UploadReportComponent } from './modules/upload-report/upload-report.component';
import { UploadStudentsComponent } from './modules/upload-students/upload-students.component';
import { RegisterCoordinatorComponent } from './modules/register-coordinator/register-coordinator.component';
import { UploadCoursesComponent } from './modules/upload-courses/upload-courses.component';
import { EnrollmentAcademicFriendComponent } from './modules/enrollment-academic-friend/enrollment-academic-friend.component';

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
      { path: 'asesorias/listar',  component: HomeComponent, canActivate:[authGuardGuard]},
      { path: 'asesorias/registrar',  component: HomeComponent, canActivate:[authGuardGuard]}
    ]
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
