import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { DynamicFormData, buildDateRangeFormGroup } from '../../models/DynamicFormData';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { MatDatepicker, MatDatepickerControl, MatDatepickerInputEvent, MatDatepickerPanel } from '@angular/material/datepicker';
import { NgxMatDatetimepicker } from '@angular-material-components/datetime-picker';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-dinamic-form',
  templateUrl: './dinamic-form.component.html',
  styleUrls: ['./dinamic-form.component.scss'],
})
export class DinamicFormComponent {
  @Input() formData!: DynamicFormData;
  @Output() formSubmit: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('picker') picker: any;
  hide: boolean = true;
  form!: FormGroup;
  dateFormatString: string = 'DD/MM/YYYY';
  currentDate = new Date();
  public color: ThemePalette = 'primary';
  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.buildForm();
  }
  dateRange = new FormGroup({
    start: new FormControl<Date | null>(null,Validators.required),
    end: new FormControl<Date | null>(null,Validators.required),
  });

  itsDateRange= false;
  buildForm(): void {
    let formGroup: any = {};
    this.formData.fields.forEach((field) => {
      const validators: any = [];
      if (field.validations) {
        if (field.required) {
          validators.push(Validators.required);
        }
        if (field.validations) {
          validators.push(...field.validations);
        }
      }
      if (field.type === 'date-range') {
        this.itsDateRange=true;
      } else {
        formGroup[field.key] = [field.value || '', validators];
      }
    });
    this.form = this.fb.group(formGroup);
  }

  get f() {
    return this.form.controls;
  }

  getCurrentDate() {
    // Date object
    return new Date().toJSON().slice(0, 10).split('-').reverse().join('/');
  }
  togglePasswordVisibility(event: Event): void {
    // Avoid form submission
    event.preventDefault();

    // Toggle password visibility
    this.hide = !this.hide;
  }
  onSubmit(): void {
    if(this.itsDateRange){
      this.form.value.dateRange=this.dateRange.value
    }
    if (this.form.valid) {
      this.formSubmit.emit(this.form.value);
      this.dateRange.reset();
      this.form.reset();
    }
  }
  getFormGroup(key: string): FormGroup {
    const control = this.form.get('dateRange')?.get(key);

    if (control instanceof FormGroup) {
      return control;
    }

    return this.fb.group({});
  }
  addEvent(type: string, event: MatDatepickerInputEvent<Date>, key: string) {
    // Maneja eventos de cambio de fecha
    const control = this.form.get(key);
    control?.patchValue(event.value);
  }
  getFormControl(controlName: string): FormControl | null {
    const control = this.form.get(controlName);
    return control instanceof FormControl ? control : null;
  }
}
