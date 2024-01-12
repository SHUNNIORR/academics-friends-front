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
import { NgxMatDatetimePickerModule,NgxMatTimepickerModule,NgxMatNativeDateModule} from '@angular-material-components/datetime-picker';
import { DinamicTableComponent } from './components/dinamic-table/dinamic-table.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import { ReportCardComponent } from './components/report-card/report-card.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DinamicDialogComponent } from './components/dinamic-dialog/dinamic-dialog.component';
import { AcademicFriendCardComponent } from './components/academic-friend-card/academic-friend-card.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatSortModule} from '@angular/material/sort';
@NgModule({
  declarations: [DinamicFormComponent, DinamicTableComponent, ReportCardComponent, DinamicDialogComponent, AcademicFriendCardComponent],
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
    MatNativeDateModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    MatPaginatorModule,
    MatTableModule,
    MatDialogModule,
    MatMenuModule,
    MatSortModule
  ],
  exports: [DinamicFormComponent, DinamicTableComponent, ReportCardComponent, AcademicFriendCardComponent],
  providers:[
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
    MatDatepickerModule
  ]
})
export class SharedModule {}
