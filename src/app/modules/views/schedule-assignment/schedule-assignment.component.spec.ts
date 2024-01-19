import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleAssignmentComponent } from './schedule-assignment.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AppModule } from 'src/app/app.module';
import { ScheduleService } from '../../services/schedule/schedule.service';
import { DialogService } from 'src/app/shared/services/dialog/dialog.service';
import { CoreService } from 'src/app/core/services/core/core.service';
import { of, throwError } from 'rxjs';

describe('ScheduleAssignmentComponent', () => {
  let component: ScheduleAssignmentComponent;
  let fixture: ComponentFixture<ScheduleAssignmentComponent>;
  let coreService: CoreService;
  let scheduleService: ScheduleService;
  let dialogService: DialogService
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule,
        MatSnackBarModule,
        MatTabsModule,
        BrowserAnimationsModule,
        MatDialogModule,
        AppModule
      ],
      providers:[
        DatePipe
      ],
      declarations: [ScheduleAssignmentComponent]
    });
    fixture = TestBed.createComponent(ScheduleAssignmentComponent);
    component = fixture.componentInstance;
    coreService = TestBed.inject( CoreService);
    scheduleService = TestBed.inject( ScheduleService);
    dialogService = TestBed.inject( DialogService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('getScheduleService', () => {
    spyOn(scheduleService, 'getAllSchedule').and.returnValue(
      of([{},{}])
    );
  
    component.getScheduleService();
  });
  it('getScheduleService', () => {
  
    spyOn(scheduleService, 'getAllSchedule').and.returnValue(
      of([])
    );
  
    component.getScheduleService();
  });
  it('getScheduleService', () => {
  
    spyOn(scheduleService, 'getAllSchedule').and.returnValue(
      throwError({error:{message:'error'}})
    );
  
    component.getScheduleService();
  });
  it('saveScheduleService', () => {
    spyOn(scheduleService, 'saveSchedule').and.returnValue(
      of([{},{}])
    );
  
    component.saveScheduleService({});
  });
  it('saveScheduleService', () => {
  
    spyOn(scheduleService, 'saveSchedule').and.returnValue(
      of([])
    );
  
    component.saveScheduleService({});
  });
  it('saveScheduleService', () => {
  
    spyOn(scheduleService, 'saveSchedule').and.returnValue(
      throwError({error:{message:'error'}})
    );
  
    component.saveScheduleService({});
  });
  it('getScheduleByEmailService', () => {
    spyOn(scheduleService, 'getSchedulesByEmail').and.returnValue(
      of([{},{}])
    );
  
    component.getScheduleByEmailService('');
  });
  it('getScheduleByEmailService', () => {
  
    spyOn(scheduleService, 'getSchedulesByEmail').and.returnValue(
      of([])
    );
  
    component.getScheduleByEmailService('');
  });
  it('getScheduleByEmailService', () => {
  
    spyOn(scheduleService, 'getSchedulesByEmail').and.returnValue(
      throwError({error:{message:'error'}})
    );
  
    component.cancelScheduleService('');
  });
  it('cancelScheduleService', () => {
    spyOn(scheduleService, 'cancelSchedule').and.returnValue(
      of([{},{}])
    );
  
    component.cancelScheduleService('');
  });
  it('cancelScheduleService', () => {
  
    spyOn(scheduleService, 'cancelSchedule').and.returnValue(
      of([])
    );
  
    component.cancelScheduleService('');
  });
  it('cancelScheduleService', () => {
  
    spyOn(scheduleService, 'cancelSchedule').and.returnValue(
      throwError({error:{message:'error'}})
    );
  
    component.cancelScheduleService('');
  });
  it('assignmentScheduleService', () => {
    spyOn(scheduleService, 'assignSchedule').and.returnValue(
      of([{},{}])
    );
  
    component.assignmentScheduleService('');
  });
  it('assignmentScheduleService', () => {
  
    spyOn(scheduleService, 'assignSchedule').and.returnValue(
      of([])
    );
  
    component.assignmentScheduleService('');
  });
  it('assignmentScheduleService', () => {
  
    spyOn(scheduleService, 'assignSchedule').and.returnValue(
      throwError({error:{message:'error'}})
    );
  
    component.assignmentScheduleService('');
  });
  it('should generate next hours', () => {
    const initialHour = '08:00';
    const result = component.generarHorasSiguientes(initialHour);

    // Assuming incrementing by 1 hour until 18:00
    const expectedHours = [
      { value: '09:00', label: '09:00' },
      { value: '10:00', label: '10:00' },
      { value: '11:00', label: '11:00' },
      { value: '12:00', label: '12:00' },
    ];

    expect(result).toEqual(expectedHours);
  });

  it('should increment hour correctly', () => {
    const initialHour = '08:00';
    const result = component.incrementarHora(initialHour);

    expect(result).toEqual('09:00');
  });

  it('should format date to string', () => {
    const date = new Date('2000-01-01T08:00');
    const result = component.formatearHora(date);

    expect(result).toEqual('08:00');
  });
  it('should add one hour to the start time', () => {
    const startTime = '08:30';
    const result = component.addOneHour(startTime);

    expect(result).toEqual({ endHour: '09:30' });
  });

  it('should get day in Spanish', () => {
    const days = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'];
    
    days.forEach(day => {
      const result = component.getDayInSpanish(day);
      const expected = {
        'MONDAY': 'Lunes',
        'TUESDAY': 'Martes',
        'WEDNESDAY': 'Miércoles',
        'THURSDAY': 'Jueves',
        'FRIDAY': 'Viernes',
      }[day];

      expect(result).toEqual(expected!);
    });

    // Test with an invalid day
    const invalidDay = 'SUNDAY';
    const result = component.getDayInSpanish(invalidDay);
    const expected = 'Día no válido';

    expect(result).toEqual(expected);
  });
});
