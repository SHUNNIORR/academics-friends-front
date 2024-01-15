import { AcademicFriend } from '../../models/AcademicFriend';
import { DialogService } from 'src/app/shared/services/dialog/dialog.service';
import { Component, ElementRef, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Day, Schedule } from '../../models/Schedule';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent {
  @Input() scheduleData: any;
  @Input() assignCalendar: boolean = true;
  @Output() optionsButtonClick = new EventEmitter<any>();
  @ViewChild('schedule') schedule!: ElementRef;
  constructor(private dialogService:DialogService){

  }
  ngOnInit(){
    this.scheduleData = this.completeSchedule(this.scheduleData)
    this.completeHoursArray()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['scheduleData']) {
      this.scheduleData = this.completeSchedule(this.scheduleData)
      this.completeHoursArray()
    }
  }
  completeHoursArray() {
    const startHour = 6;
    const endHour = 18;

    this.scheduleData.days.forEach((day:any) => {
      const existingHours = day.hours.map((hour:any) => hour.hour.substring(0, 5));

      for (let i = startHour; i <= endHour; i++) {
        const formattedHour = `${i < 10 ? '0' : ''}${i}:00`;

        if (!existingHours.includes(formattedHour)) {
          day.hours.push({
            hour: formattedHour,
            classroom: null,
            academicFriends: []
          });
        }
      }

      // Sort the hours array based on the hour property
      day.hours.sort((a:any, b:any) => (a.hour > b.hour) ? 1 : -1);
    });
  }

  completeSchedule(schedule: Schedule): Schedule {
    const daysOfWeek = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"];
  
    // Crear un nuevo arreglo de días con la estructura deseada
    const updatedDays: Day[] = daysOfWeek.map((day) => {
      // Buscar el día en el arreglo original
      const originalDay = schedule.days.find((d) => d.day === day);
  
      // Si el día existe en el arreglo original, retornarlo; de lo contrario, retornar un objeto vacío
      return originalDay || { day, hours: [] };
    });
  
    // Actualizar el objeto de schedule con el nuevo arreglo de días
    const updatedSchedule: Schedule = {
      numberOfHours: schedule.numberOfHours,
      days: updatedDays,
    };
    
    return updatedSchedule;
  }

  emittEvent(hourObject:any, day:string){
    const emitObj = {
      hourObject: hourObject,
      day: day
    }
    this.optionsButtonClick.emit(emitObj)
  }
  
  alreadyAssigned(academicFriends:any []){
    return academicFriends.includes(localStorage.getItem('email'))
  }
  //-------generar pdf del horario----------------
  captureHtmlAsImage(htmlFragment: HTMLElement, fileName: string) {
    html2canvas(htmlFragment).then(canvas => {
      const imageSrc = canvas.toDataURL('image/png');
      // Crear un enlace temporal
      const link = document.createElement('a');
      link.href = imageSrc;
      link.download = fileName;
      // Simular clic en el enlace
      link.click();
    });
  }
  generateImage() {
    const fragment = this.schedule.nativeElement;
    this.captureHtmlAsImage(fragment,'horario.png');
  }
  transformAcademicFriends(academicFriends: string[]): string[] {
    return academicFriends.map(email => email.split('@')[0]); // Obtener la parte antes de "@"
  }
}




