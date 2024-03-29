import { Component } from '@angular/core';
import { DynamicFormData } from 'src/app/shared/models/DynamicFormData';
import { ENROLLMENT } from '../../metadata/enrollment-academic-friend/enrollment-academic-friend.metadata';
import { EnrollmentService } from '../../services/enrollment/enrollment.service';
import { CoreService } from 'src/app/core/services/core/core.service';
import { EnrollStudentRequest } from '../../models/Student';
import { ConvocationService } from '../../services/convocation/convocation.service';
import { Schedule } from '../../models/Schedule';
import { tuObjetoConDatos } from '../../metadata/schedule-assignment/shedule-assignment';
import { ScheduleService } from '../../services/schedule/schedule.service';

@Component({
  selector: 'app-enrollment-academic-friend',
  templateUrl: './enrollment-academic-friend.component.html',
  styleUrls: ['./enrollment-academic-friend.component.scss']
})
export class EnrollmentAcademicFriendComponent {
  formConfig: DynamicFormData = ENROLLMENT
  thereActiveConsultancy: boolean = false;
  assignCalendarData:Schedule;
  constructor(private enrollmentService:EnrollmentService,private scheduleService:ScheduleService, private convocationService:ConvocationService, private coreService:CoreService){
    this.assignCalendarData = tuObjetoConDatos;
  }
  ngAfterViewInit() {
    this.getConvocationActiveService();
    this.getScheduleService()
  }
  getConvocationActiveService() {
    this.convocationService.getConvocationActive().subscribe({
      next: (res: any) => {
        res==null?this.thereActiveConsultancy=false:this.thereActiveConsultancy=true
      },
      error: (err: Error) => {
        this.coreService.showMessage(
          'Error al consultar convocatoria activa: ' + err.message
        );
      },
    });
  }
  onFormSubmit(formData: any): void {
    this.enrollStudent(formData);
  }

  enrollStudent(student:EnrollStudentRequest){
    this.enrollmentService.enrollStudent(student).subscribe({
      next:(res:any)=>{
        this.coreService.showMessage("Inscripción éxitosa")
      },
      error:(err:any)=>{
        this.coreService.showMessage(`Error al inscribirse: ${err.error.message}`)
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
}
