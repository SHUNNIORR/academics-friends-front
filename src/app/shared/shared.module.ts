import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DinamicFormComponent } from './components/dinamic-form/dinamic-form.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import {MatNativeDateModule} from '@angular/material/core';
@NgModule({
  declarations: [DinamicFormComponent],
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    MatSelectModule,
    NgxMatFileInputModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  exports: [DinamicFormComponent],
  providers:[
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
  ]
})
export class SharedModule {}
