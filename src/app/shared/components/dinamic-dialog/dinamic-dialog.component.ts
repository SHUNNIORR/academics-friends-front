import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DynamicFormData } from '../../models/DynamicFormData';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-dinamic-dialog',
  templateUrl: './dinamic-dialog.component.html',
  styleUrls: ['./dinamic-dialog.component.scss']
})
export class DinamicDialogComponent {
  @Input() title: string = 'Formulario Dinámico';
  @Input() formData!: DynamicFormData; // Objeto de configuración para el formulario
  @Output() formSubmit: EventEmitter<any> = new EventEmitter<any>();
  hide: boolean = true;
  form!: FormGroup;
  dateFormatString: string = 'DD/MM/YYYY';
  currentDate = new Date();
  public color: ThemePalette = 'primary';

  constructor(
    public dialogRef: MatDialogRef<DinamicDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.title=data.title;
    this.formData= data.formData;
  }

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
      console.log(this.form.value);
      this.formSubmit.emit(this.form.value);
      this.dialogRef.close(this.form.value);
      this.dateRange.reset();
      this.form.reset();
    }
  }
  onCancel(): void {
    this.dialogRef.close();
  }

}
