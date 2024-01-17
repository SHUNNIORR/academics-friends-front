import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DinamicFormComponent } from './dinamic-form.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UPLOAD_CONTRACT } from 'src/app/modules/metadata/academic-friend/academic-friend.metadata';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule,
} from '@angular-material-components/datetime-picker';
import { MatPaginatorModule } from '@angular/material/paginator';

describe('DinamicFormComponent', () => {
  let component: DinamicFormComponent;
  let fixture: ComponentFixture<DinamicFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DinamicFormComponent],
      imports: [
        ReactiveFormsModule,
        MatDatepickerModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        NgxMatFileInputModule,
        MatSelectModule,
        NgxMatFileInputModule,
        MatNativeDateModule,
        NgxMatDatetimePickerModule,
        NgxMatTimepickerModule,
        NgxMatNativeDateModule,
        MatPaginatorModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DinamicFormComponent);
    component = fixture.componentInstance;
    component.formData = UPLOAD_CONTRACT;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call formSubmit.emit() when onSubmit is called with valid form', () => {
    // Configuración del formulario con datos de prueba
    component.formData = UPLOAD_CONTRACT;
    component.buildForm();
    spyOn(component.formSubmit, 'emit');
    // Establecer datos de prueba en el formulario (ajústalo según tus necesidades)
    component.form.patchValue({
      contract: 'xxx',
    });
    // Llamada al método onSubmit
    component.onSubmit();

    // Verificar que formSubmit.emit fue llamado
    expect(component.formSubmit.emit).toHaveBeenCalled();
  });

  it('should not call formSubmit.emit() when onSubmit is called with invalid form', () => {
    spyOn(component.formSubmit, 'emit');

    component.onSubmit();

    expect(component.formSubmit.emit).not.toHaveBeenCalled();
  });
  // Should return a FormGroup object when given a valid key
  it('should return a FormGroup object when given a valid key', () => {
    const component = new DinamicFormComponent(new FormBuilder());
    component.form = new FormGroup({
      dateRange: new FormGroup({
        start: new FormControl<Date | null>(null, Validators.required),
        end: new FormControl<Date | null>(null, Validators.required),
      }),
    });
    const result = component.getFormGroup('start');
    expect(result).toBeInstanceOf(FormGroup);
  });
  // Should return an empty FormGroup object when given an invalid key

  it('should return an empty FormGroup when calling getFormGroup with invalid key', () => {
    // Configurar el componente para que no sea un formulario de rango de fechas
    component.itsDateRange = false;
    component.buildForm();

    // Llamada a la función getFormGroup con una clave inválida
    const result: FormGroup = component.getFormGroup('invalidKey');

    // Verificar que el resultado sea un FormGroup vacío
    expect(result instanceof FormGroup).toBeTruthy();
    expect(result.controls).toEqual({});
  });
  // should update the value of the form control with the selected date
  it('should update the value of the form control when a date is selected', () => {
    const component = new DinamicFormComponent(new FormBuilder());
    component.form = new FormGroup({
      date: new FormControl(null),
    });
    const event = { value: new Date() };
    component.addEvent('change', event as any, 'date');
    expect(component.form.get('date')?.value).toEqual(event.value);
  });
  // should return a FormControl instance when the controlName exists in the form
  it('should return a FormControl instance when the controlName exists in the form', () => {
    const component = new DinamicFormComponent(new FormBuilder());
    component.form = new FormGroup({
      control1: new FormControl(),
      control2: new FormControl(),
    });
    const result = component.getFormControl('control1');
    expect(result).toBeInstanceOf(FormControl);
  });
      // Returns a string in the format 'DD/MM/YYYY'
      it('should return a string in the format DD/MM/YYYY', () => {
        
        const currentDate = component.getCurrentDate();
        expect(currentDate).toMatch(/^\d{2}\/\d{2}\/\d{4}$/);
      });
          // Toggles the 'hide' boolean to its opposite value.
    it('should toggle the hide boolean when called', () => {
      component.hide = true;

      // Act
      component.togglePasswordVisibility(new Event('click'));

      // Assert
      expect(component.hide).toBe(false);
    });
});
