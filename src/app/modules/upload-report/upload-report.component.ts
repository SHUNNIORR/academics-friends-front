import { Component } from '@angular/core';
import { CREATE_REPORT } from '../metadata/upload-report/upload-report.metadata';
import { DynamicFormData } from 'src/app/shared/models/DynamicFormData';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-upload-report',
  templateUrl: './upload-report.component.html',
  styleUrls: ['./upload-report.component.scss']
})
export class UploadReportComponent {

  formConfig: DynamicFormData = CREATE_REPORT
  onFormSubmit(formData: any): void {
    console.log('Form submitted with data:', formData);
    // Implementar lógica adicional según tus necesidades
  }
}
