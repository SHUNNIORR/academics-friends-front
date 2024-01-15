import { Component } from '@angular/core';
import { APPROVE_STUDENT, QUALIFY_STUDENT, TABLE_COLUMNS_NAME_STUDENTS, optionsTableStudentApprove, optionsTableStudentRegistered } from '../../metadata/convocation/convocation.metadata';
import { DatePipe } from '@angular/common';
import { ConvocationService } from '../../services/convocation/convocation.service';
import { CoreService } from 'src/app/core/services/core/core.service';
import { AcademicFriendsService } from '../../services/academic-friends/academic-friends.service';
import { FileService } from '../../services/file/file.service';
import { DialogService } from 'src/app/shared/services/dialog/dialog.service';

@Component({
  selector: 'app-convocation-approvals',
  templateUrl: './convocation-approvals.component.html',
  styleUrls: ['./convocation-approvals.component.scss']
})
export class ConvocationApprovalsComponent {
  studentsTableData: any[] = [];
  optionsData = optionsTableStudentApprove;
  studentsRegisteredColumnNames = TABLE_COLUMNS_NAME_STUDENTS;
  activeConvocationId:number=0;
  constructor(
    private datePipe: DatePipe,
    private convocationService: ConvocationService,
    private coreService: CoreService,
    private academicFriendsService: AcademicFriendsService,
    private fileService: FileService,
    private dialogService:DialogService
  ) {}
  ngOnInit(){
    this.getConvocationActiveService()
  }
  getConvocationActiveService() {
    this.convocationService.getConvocationActive().subscribe({
      next: (res: any) => {
        this.activeConvocationId=res.id;
        this.getRegisteredStudentsByActiveConvocationService(res.id)
      },
      error: (err: Error) => {
        this.coreService.showMessage(
          'Error al consultar convocatoria activa: ' + err.message
        );
      },
    });
  }
  getRegisteredStudentsByActiveConvocationService(id: number) {
    this.academicFriendsService
      .getAcademicFriendByConvocationActive(id)
      .subscribe({
        next: (res: any) => {
          this.studentsTableData = res.filter((obj:{score: number,status:string})=> obj.score!=0 && obj.status=="pending");
        },
        error: (err: Error) => {
          this.coreService.showMessage(
            'Error al crear convocatoria: ' + err.message
          );
        },
      });
  }
  handleCustomEvent(event: any) {
    if (event.id == 'downloadHV') {
      this.downloadFileService(event.element.resume);
    } else if (event.id == 'downloadContract'){
      this.downloadFileService(event.element.contract);
    } else if (event.id == 'approve'){
      this.openDialogApproveStudent(event)
    }
  } 
  downloadFileService(fileUrl:string){
    this.fileService.downloadFile(fileUrl).subscribe({
      next:blob => {
        const file = new Blob([blob], { type: 'application/octet-stream' });

        // Crear un enlace temporal y simular un clic para descargar el archivo
        const url = window.URL.createObjectURL(file);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${fileUrl}`; // Puedes establecer el nombre del archivo aquí
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        this.coreService.showMessage("Archivo descargado con éxito")
      },
      error:(err:any)=>{
        this.coreService.showMessage('Hubo un error descargando el archivo:'+ err.message);
      }
    })
  }
  openDialogApproveStudent(data:any){
    const formData = APPROVE_STUDENT
    this.dialogService.openDynamicDialog('Aprobar estudiante', formData)
      .afterClosed()
      .subscribe((res:any) => {
        if(res == ''){
          return
        }
         const objToQualifyStudent = {
            email:data.element.email,
            score:data.element.score,
            observations:data.element.observations,
            state:"pass",
            password:res.password
          }
          this.approveStudentService(objToQualifyStudent)
      });
  }
  approveStudentService(objToQualifyStudent:any){
    this.academicFriendsService.updateAcademicFriend(objToQualifyStudent).subscribe({
      next:(res) => {
        this.getRegisteredStudentsByActiveConvocationService(this.activeConvocationId)
        this.coreService.showMessage('Estudiante aprobado correctamente');
      },
      error:(err:any)=>{
        this.coreService.showMessage('Hubo un error aprobando el estudiante:'+ err.message);
      }
    })
  }
}
