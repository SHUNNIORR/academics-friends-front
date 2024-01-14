import { AcademicFriendsService } from './../services/academic-friends/academic-friends.service';
import { Component } from '@angular/core';
import { StudentsService } from '../services/students/students.service';
import { CoreService } from 'src/app/core/services/core/core.service';
import { StudentInfo } from '../models/Student';
import { DialogService } from 'src/app/shared/services/dialog/dialog.service';
import { RESET_PASSWORD } from '../metadata/academic-friend/academic-friend.metadata';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  studentInfo: StudentInfo | null = null;
  constructor(
    private academicFriendsService: AcademicFriendsService,
    private coreService: CoreService,
    private dialogService:DialogService
  ) {}

  ngOnInit(){
    this.getUserInfo(localStorage.getItem('email')!)
  }
  getUserInfo(email:string) {
    this.academicFriendsService.getAcademicFriendByEmail(email).subscribe({
      next: (res: any) => {
        if(res){
          this.studentInfo = res;
        }else{
          this.coreService.showMessage("No se encontró ningún estudiante")
        }
      },
      error: (error: Error) => {
        console.log('error', error.message);
      },
    });
  }

  openDialogReplyAssignment(){
    const formData = RESET_PASSWORD
    this.dialogService.openDynamicDialog('Cambiar contraseña', formData)
      .afterClosed()
      .subscribe((res:any) => {
        if(res == ''){
          return
        }
         const objToResetPassword = {
            email:localStorage.getItem('email'),
            password:res.password,
          }
        this.resetPasswordService(objToResetPassword)
      });
  }

  resetPasswordService(objToReset:any){
    this.academicFriendsService.resetPassword(objToReset).subscribe({
      next: (res:any) => {
        this.coreService.showMessage("Contraseña actualizada con éxito")
      },
      error: (err:any) =>{
        this.coreService.showMessage("Ocurrió un error al cambiar la contraseña")
      }
    })
  }
}
