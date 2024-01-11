import { Component } from '@angular/core';
import { ASSIGN_SCHEDULE, REPLY_ASSIGN_SCHEDULE, TABLE_COLUMNS_ASSIGN_SCHEDULE, optionsTableAssignmentSchedule } from '../metadata/schedule-assignment/shedule-assignment';
import { CoreService } from 'src/app/core/services/core/core.service';
import { ScheduleService } from '../services/schedule/schedule.service';
import { DialogService } from 'src/app/shared/services/dialog/dialog.service';

@Component({
  selector: 'app-schedule-assignment',
  templateUrl: './schedule-assignment.component.html',
  styleUrls: ['./schedule-assignment.component.scss']
})
export class ScheduleAssignmentComponent {
  isCoordinator: boolean = localStorage.getItem('role')=='coordinator';
  email = localStorage.getItem('email')
  assignScheduleForm = ASSIGN_SCHEDULE;
  assignScheduleTableData:any[] = [];
  assignScheduleColumnNames:any[] = TABLE_COLUMNS_ASSIGN_SCHEDULE;

  assignScheduleByEmailTableData:any[] = [];
  optionsData= optionsTableAssignmentSchedule;
  constructor(private coreService:CoreService, private scheduleService:ScheduleService, private dialogService:DialogService) {

  }

  ngOnInit(){
    this.isCoordinator?this.getAllSchedule():this.getScheduleByEmail();
  }
  saveSchedule(event:any){
    console.log(event)
    this.saveScheduleService(event)
  }
  getAllSchedule(){
    this.getScheduleService()
  }
  getScheduleByEmail(){
    this.getScheduleByEmailService(this.email!);
  }
  saveScheduleService(schedule:any){
    this.scheduleService.saveSchedule(schedule).subscribe({
      next:()=>{  
        this.coreService.showMessage('Se asignó exitosamente el horario')
        this.getScheduleService();
      },
      error:(err:any)=>{
        this.coreService.showMessage('Sucedió un error al asignar horario: '+err.error.message)
      } 
    })
  }
  getScheduleService(){
    this.scheduleService.getAllSchedule().subscribe({
      next:(res:any)=>{  
        this.assignScheduleTableData=res;
      },
      error:(err:any)=>{
        this.coreService.showMessage('Sucedió un error al traer los horarios: '+err.error.message)
      } 
    })
  }
  getScheduleByEmailService(email:string){
    this.scheduleService.getSchedulesByEmail(email).subscribe({
      next:(res:any)=>{  
        this.assignScheduleByEmailTableData=res;
        if(res.length==0){
          this.coreService.showMessage('Aún no tienes asignaciones de horario')
        }
      },
      error:(err:any)=>{
        this.coreService.showMessage('Sucedió un error al traer los horarios: '+err.error.message)
      } 
    })
  }
  handleCustomEvent(event:any){
    this.openDialogReplyAssignment(event);
  }
  openDialogReplyAssignment(data:any){
    const formData = REPLY_ASSIGN_SCHEDULE
    this.dialogService.openDynamicDialog('Aprobar estudiante', formData)
      .afterClosed()
      .subscribe((res:any) => {
         const objToReply = {
            id:data.element.id,
            ...res
          }
          console.log(objToReply)
          this.replyAssignmentService(objToReply)
      });
  }
  replyAssignmentService(replyObj:any){
    this.scheduleService.replySchedule(replyObj).subscribe({
      next:(res:any)=>{  
        this.coreService.showMessage('Respuesta enviada con éxito')
        this.getScheduleByEmail()
      },
      error:(err:any)=>{
        this.coreService.showMessage('Sucedió un error al traer los horarios: '+err.error.message)
      } 
    })
  }
}
