import { Validators } from '@angular/forms';
import { DynamicFormData } from 'src/app/shared/models/DynamicFormData';

export const CREATE_REPORT: DynamicFormData = {
  fields: [
    {
      key: 'type',
      label: 'Tipo de informe',
      type: 'select',
      required: true,
      validations: [Validators.required],
      selectOptions: [
        { value: 'monthly', label: 'Mensual' },
        { value: 'final', label: 'Final' },
      ],
    },
    {
      key: 'file',
      label: 'Subir archivo de informe',
      type: 'file',
      filesAccepted:'application/pdf, .pdf',
      validations: [Validators.required],
    },
    {
      key: 'date',
      label: 'Fecha de informe',
      type: 'date',
      required: true,
      validations: [Validators.required],
    },
  ],
  buttonLabel: 'Cargar reporte',
};
export const UPDATE_REPORT_AACA: DynamicFormData = {
  fields: [
    {
      key: 'file',
      label: 'Subir archivo de informe',
      type: 'file',
      filesAccepted:'application/pdf, .pdf',
      validations: [Validators.required],
    },
  ],
  buttonLabel: 'Corregir informe',
};
export interface ReportResponse {
  id:                  number;
  academicFriendEmail: string;
  type:                string;
  observations:        null;
  state:               string;
  date:                Date;
  uploadDate:          Date;
  file:                string;
}
