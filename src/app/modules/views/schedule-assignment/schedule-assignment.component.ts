import { Component } from '@angular/core';
import { ASSIGN_MY_SCHEDULE, ASSIGN_SCHEDULE, ENABLE_SCHEDULE, REPLY_ASSIGN_SCHEDULE, TABLE_COLUMNS_ASSIGN_SCHEDULE, optionsTableAssignmentSchedule, tuObjetoConDatos } from '../../metadata/schedule-assignment/shedule-assignment';
import { CoreService } from 'src/app/core/services/core/core.service';
import { ScheduleService } from '../../services/schedule/schedule.service';
import { DialogService } from 'src/app/shared/services/dialog/dialog.service';
import { Schedule } from '../../models/Schedule';

@Component({
  selector: 'app-schedule-assignment',
  templateUrl: './schedule-assignment.component.html',
  styleUrls: ['./schedule-assignment.component.scss']
})
export class ScheduleAssignmentComponent {
  isCoordinator: boolean = localStorage.getItem('role')=='coordinator';
  email = localStorage.getItem('email')
  assignScheduleForm = ENABLE_SCHEDULE;
  assignScheduleTableData:any[] = [];
  assignScheduleColumnNames:any[] = TABLE_COLUMNS_ASSIGN_SCHEDULE;

  assignScheduleByEmailTableData:any[] = [];
  optionsData= optionsTableAssignmentSchedule;

  afCalendarData:Schedule;
  assignCalendarData:Schedule;
  constructor(private coreService:CoreService, private scheduleService:ScheduleService, private dialogService:DialogService) {
    this.afCalendarData = tuObjetoConDatos;
    this.assignCalendarData = tuObjetoConDatos;
  }
 
  ngOnInit(){
    if(this.isCoordinator){
      this.getAllSchedule()
    }else{
      this.getScheduleByEmail()
      this.getAllSchedule()
    }
  }
  saveSchedule(event:any){
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
        if(res.length==0){
          return this.coreService.showMessage('Aún no hay horarios disponibles')
        }
        this.assignCalendarData=res;

      },
      error:(err:any)=>{
        this.coreService.showMessage('Sucedió un error al traer los horarios: '+err.error.message)
      } 
    })
  }
  getScheduleByEmailService(email:string){
    this.scheduleService.getSchedulesByEmail(email).subscribe({
      next:(res:any)=>{ 
        if(res.length==0){
          return this.coreService.showMessage('Aún no tienes asignaciones de horario')
        }
        this.afCalendarData=res
      },
      error:(err:any)=>{
        this.coreService.showMessage('Sucedió un error al traer los horarios: '+err.error.message)
      } 
    })
  }
  handleCustomEvent(event:any){
    if(event.action=='cancel'){
      console.log('cancel')
    }else{
      this.openDialogAssignSchedule(event);
    }
  }
  enableSchedule(event:any){
    console.log(event)
  }
  openDialogAssignSchedule(data:any){
    const formData = ASSIGN_MY_SCHEDULE
    formData.fields[0].selectOptions=this.generarHorasSiguientes(data.hourObject.hour);
    this.dialogService.openDynamicDialog(`Tomar horario de: ${this.getDayInSpanish(data.day)}:${data.hourObject.hour} a ...`, formData)
      .afterClosed()
      .subscribe((res:any) => {
        if(res == ''){
          return
        }
        const objToAssignAchedule = {
          academicFriendEmail: localStorage.getItem('email'),
          day: data.day,
          startHour: data.hourObject.hour,
          endHour: res.endHour
        }

        this.assignmentScheduleService(objToAssignAchedule)
      });
  }
  openDialogReplyAssignment(data:any){
    const formData = REPLY_ASSIGN_SCHEDULE
    this.dialogService.openDynamicDialog('Aprobar estudiante', formData)
      .afterClosed()
      .subscribe((res:any) => {
        if(res == ''){
          return
        }
         const objToReply = {
            id:data.element.id,
            ...res
          }
          //this.assignmentAcheduleService(objToReply)
      });
  }
  assignmentScheduleService(replyObj:any){
    this.scheduleService.assignSchedule(replyObj).subscribe({
      next:(res:any)=>{  
        this.coreService.showMessage('Horario asignado con éxito')
        this.getScheduleByEmail()
        this.getAllSchedule();
      },
      error:(err:any)=>{
        this.coreService.showMessage('Sucedió un error asignando el horario: '+err.error.message)
      } 
    })
  }
  addOneHour(startTime:string) {
    // Split the time into hours and minutes
    const [hours, minutes] = startTime.split(":").map(Number);
  
    // Add one hour
    const newHour = hours + 1;
  
    // Format the new hour as a string and ensure it has two digits
    const formattedHour = newHour.toString().padStart(2, "0");
  
    // Format the minutes as a string and ensure it has two digits
    const formattedMinutes = minutes.toString().padStart(2, "0");
  
    // Create the object with the new hour
    const result = {
      endHour: `${formattedHour}:${formattedMinutes}`,
    };
  
    return result;
  }

  getDayInSpanish(day:string) {
    switch (day) {
      case 'MONDAY':
        return 'Lunes';
      case 'TUESDAY':
        return 'Martes';
      case 'WEDNESDAY':
        return 'Miércoles';
      case 'THURSDAY':
        return 'Jueves';
      case 'FRIDAY':
        return 'Viernes';
      default:
        return 'Día no válido';
    }
  }
  generarHorasSiguientes(horaInicial: string): any[] {
    const horas = [];
    let horaActual = this.incrementarHora(horaInicial);

    const horaMaxima:string = `${Number(horaActual.split(':')[0])+4}:00`
    console.log(horaMaxima)
    while (horaActual < horaMaxima) {
      horas.push({ value: horaActual, label: horaActual });
      horaActual = this.incrementarHora(horaActual);
    }

    return horas;
  }

  incrementarHora(hora: string): string {
    const fecha = new Date(`2000-01-01T${hora}`);
    fecha.setHours(fecha.getHours() + 1);
    return this.formatearHora(fecha);
  }

  formatearHora(fecha: Date): string {
    return fecha.toTimeString().slice(0, 5);
  }
}
