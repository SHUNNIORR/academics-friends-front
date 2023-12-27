import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DynamicFormData } from '../../models/DynamicFormData';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-dinamic-form',
  templateUrl: './dinamic-form.component.html',
  styleUrls: ['./dinamic-form.component.scss'],
})
export class DinamicFormComponent {
  @Input() formData!: DynamicFormData;
  @Output() formSubmit: EventEmitter<any> = new EventEmitter<any>();
  hide: boolean = true;
  form!: FormGroup;
  dateFormatString: string = 'DD/MM/YYYY'
  currentDate = new Date()
  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.buildForm();
  }

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

      formGroup[field.key] = [field.value || '', validators];
    });

    this.form = this.fb.group(formGroup);
  }

  get f() {
    return this.form.controls;
  }

  getCurrentDate(){
    // Date object
    return new Date().toJSON().slice(0,10).split('-').reverse().join('/')
  }
  togglePasswordVisibility(event: Event): void {
    // Avoid form submission
    event.preventDefault();
    
    // Toggle password visibility
    this.hide = !this.hide;
}
  onSubmit(): void {
    if (this.form.valid) {
      this.formSubmit.emit(this.form.value);
      this.form.reset();
    }
  }
}
