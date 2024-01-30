import { DialogService } from '../../../shared/services/dialog/dialog.service';
import { QUALIFY_STUDENT, optionsTableStudentPass } from '../../metadata/convocation/convocation.metadata';
import { AcademicFriendsService } from '../../services/academic-friends/academic-friends.service';
import { Component } from '@angular/core';
import { RESET_PASSWORD, SEARCH_ACADEMIC_FRIEND, SEARCH_ACADEMIC_FRIEND_BY_EMAIL, UPLOAD_CONTRACT } from '../../metadata/academic-friend/academic-friend.metadata';
import { ConsultancyService } from '../../services/consultancy/consultancy.service';
import { TABLE_COLUMNS_NAME_CONSULTANCY } from '../../metadata/consultancy/consultancy.metadata';
import { CoreService } from 'src/app/core/services/core/core.service';
import { TABLE_COLUMNS_NAME_STUDENTS, optionsTableStudentApprove } from '../../metadata/convocation/convocation.metadata';
import { FileService } from '../../services/file/file.service';

@Component({
  selector: 'app-academic-friends',
  templateUrl: './academic-friends.component.html',
  styleUrls: ['./academic-friends.component.scss']
})
export class AcademicFriendsComponent {
  searchAcademicFriend = SEARCH_ACADEMIC_FRIEND;
  searchAcademicFriendByEmail = SEARCH_ACADEMIC_FRIEND_BY_EMAIL;
  consultancyByAFtableData:any[] = [];
  consultancyByAFcolumnNames:any[] = TABLE_COLUMNS_NAME_CONSULTANCY;

  findAFByCodetableData:any[] = [];
  findAFByCodecolumnNames:any[] = TABLE_COLUMNS_NAME_STUDENTS;

  allAftableData:any[] = [];
  allAfcolumnNames:any[] = TABLE_COLUMNS_NAME_STUDENTS;

  optionsData = optionsTableStudentPass;
  // consultancyByAFtableData:any[] = [];
  // consultancyByAFcolumnNames:any[] = TABLE_COLUMNS_NAME_CONSULTANCY;
  constructor(private consultancyService:ConsultancyService, private coreService:CoreService, private academicFriendsService:AcademicFriendsService, private fileService:FileService, private dialogService:DialogService){

  }
  ngOnInit(){
    this.getAllAcademicFriends();
  }
  getConsultancyByAf(event: any): void {
    // Implementar lógica adicional según tus necesidades
    this.getConsultancyByEmail(event.academicFriendEmail);
  }
  getAfInfo(formData: any): void {
    // Implementar lógica adicional según tus necesidades
    this.getAcademicFriendByCode( formData.academicFriendCode)
  }

  getConsultancyByEmail(email:string){
      this.consultancyService.getAllConsultancyByEmail(email).subscribe({
        next:(res:any)=>{
          if(res==null){
            this.consultancyByAFtableData=[]
            this.coreService.showMessage('No se encontró el amigo académico: '+email)
          }else{
            this.consultancyByAFtableData=res;
          }
        },
        error:(err:any)=>{
          this.coreService.showMessage('Hubo un error: ' + err.error.message)
        }
      })
  }

  getAcademicFriendByCode(code:number){
    this.academicFriendsService.findAcademicFriendByCode(code).subscribe({
      next:(res:any)=>{
        if(res==null || res.status!='pass'){
          this.findAFByCodetableData=[]
          this.coreService.showMessage('No se encontró el amigo académico con código: '+code)
        }else{
          this.findAFByCodetableData=[]
          this.findAFByCodetableData.push(res);
        }
      },
      error:(err:any)=>{
        this.coreService.showMessage('Hubo un error: ' + err.error.message)
      }
    })
  }

  getAllAcademicFriends(){
    this.academicFriendsService.getAllAcademicFriends().subscribe({
      next:(res:any)=>{
        this.allAftableData=res.filter((obj: { status: string; }) => obj.status === "pass");
      },
      error:(err:any)=>{
        this.coreService.showMessage('Hubo un error: ' + err.error.message)
      }
    })
  }
  handleCustomEvent(event: any) {
    if (event.id == 'downloadHV') {
      this.downloadFileService(event.element.resume);
    } else if (event.id == 'downloadContract') {
      this.downloadFileService(event.element.contract);
    } else if (event.id == 'uploadContract') {
      this.openDialogUploadContract(event);
    } else if (event.id == 'resetPassword') {
      this.openDialogResetPassword(event);
    }
  }
  downloadFileService(fileUrl: string) {
    this.fileService.downloadFile(fileUrl).subscribe({
      next: (blob) => {
        const file = new Blob([blob], { type: 'application/octet-stream' });

        // Crear un enlace temporal y simular un clic para descargar el archivo
        const url = window.URL.createObjectURL(file);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${fileUrl}`; // Puedes establecer el nombre del archivo aquí
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        this.coreService.showMessage('Archivo descargado con éxito');
      },
      error: (err: any) => {
        this.coreService.showMessage(
          'Hubo un error descargando el archivo:' + err.message
        );
      },
    });
  }
  openDialogUploadContract(data: any) {
    const formData = UPLOAD_CONTRACT;
    this.dialogService
      .openDynamicDialog('Cargar contrato', formData)
      .afterClosed()
      .subscribe((res: any) => {
        if(res == ''){
          return
        }
        this.uploadContractStudentService(res.contract, data.element.email);
      });
  }

  uploadContractStudentService(file:any, email:string) {
    this.academicFriendsService
      .uploadContract(file,email)
      .subscribe({
        next: (res) => {
          //this.getRegisteredStudentsByActiveConvocationService(this.activeConvocationId);
          this.getAllAcademicFriends();
          this.coreService.showMessage('Contrato cargado con éxito');
        },
        error: (err: any) => {
          this.coreService.showMessage('Hubo un error al cargar el contrato:' + err.error.message);
        },
      });
  }
  openDialogResetPassword(event:any){
    const formData = RESET_PASSWORD
    this.dialogService.openDynamicDialog('Cambiar contraseña', formData)
      .afterClosed()
      .subscribe((res:any) => {
        if(res == ''){
          return
        }
         const objToResetPassword = {
            email:event.element.email,
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
