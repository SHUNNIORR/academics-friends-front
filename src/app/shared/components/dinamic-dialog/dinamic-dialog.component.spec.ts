import { DynamicFormData } from 'src/app/shared/models/DynamicFormData';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DinamicDialogComponent } from './dinamic-dialog.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DialogService } from '../../services/dialog/dialog.service';
import { SEARCH_ACADEMIC_FRIEND } from 'src/app/modules/metadata/academic-friend/academic-friend.metadata';
import { MatInputModule } from '@angular/material/input';

describe('DinamicDialogComponent', () => {
  let component: DinamicDialogComponent;
  let fixture: ComponentFixture<DinamicDialogComponent>;
  const dialogMock = {
    close: () => { }
    };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatDatepickerModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        NgxMatFileInputModule,
        MatSelectModule,
        MatNativeDateModule,
        NgxMatDatetimePickerModule,
        NgxMatTimepickerModule,
        NgxMatNativeDateModule,
        MatPaginatorModule,
        MatDialogModule,
        MatInputModule
      ],
      providers: [
        {provide:MatDialogRef , useValue:dialogMock },

        { provide: MAT_DIALOG_DATA, useValue: {} }
      ],
      declarations: [DinamicDialogComponent]
    });
    fixture = TestBed.createComponent(DinamicDialogComponent);
    component = fixture.componentInstance;
    component.formData = SEARCH_ACADEMIC_FRIEND
    component.formData.fields.push({
      key: 'dateRange',
      label: 'Fechas de inscripción',
      type: 'date-range',
      required: true,
      dateRange: new FormGroup({
        start: new FormControl<Date | null>(null,Validators.required),
        end: new FormControl<Date | null>(null,Validators.required),
      }),
      startDateName: new FormControl<Date | null>(null,Validators.required),
      endDateName: new FormControl<Date | null>(null,Validators.required),
    },)
    fixture.detectChanges();
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should initialize form', () => {

    component.ngOnInit();
    expect(component.form).toBeTruthy();
  });
  it('should toggle password visibility', () => {
    expect(component.hide).toBeTruthy();

    component.togglePasswordVisibility(new Event('click'));

    expect(component.hide).toBeFalsy();
  });
  it('should submit form', () => {
    
    const formValue = { academicFriendCode: '1', dateRange: Object({ start: null, end: null })};
    spyOn(component.formSubmit, 'emit');
    spyOn(component.dialogRef, 'close');
    spyOn(component.dateRange,'reset')
    spyOn(component.form,'reset')
    component.itsDateRange=true;
    component.form.addControl('dateRange', new FormControl('', Validators.required))
    component.form.setValue(formValue);
    component.onSubmit();

    expect(component.formSubmit.emit).toHaveBeenCalledWith(formValue);
    expect(component.dialogRef.close).toHaveBeenCalledWith(formValue);
    expect(component.dateRange.reset).toHaveBeenCalled();
    expect(component.form.reset).toHaveBeenCalled();
  });
  
  it('should cancel form', () => {
    spyOn(component.dialogRef, 'close');
    component.onCancel();
    expect(component.dialogRef.close).toHaveBeenCalled();
  });
  it('should get form controls using f()', () => {
    component.ngOnInit();
  
    const formControls = component.f;
  
    expect(formControls).toBeTruthy();
  });
  
  it('should get current date in DD/MM/YYYY format', () => {
    const currentDate = new Date();
    const expectedDate = currentDate
      .toJSON()
      .slice(0, 10)
      .split('-')
      .reverse()
      .join('/');
  
    const currentDateFormatted = component.getCurrentDate();
  
    expect(currentDateFormatted).toEqual(expectedDate);
  });
});
