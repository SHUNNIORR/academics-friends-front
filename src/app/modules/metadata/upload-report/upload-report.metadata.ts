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
        { value: 'montly', label: 'Mensual' },
        { value: 'final', label: 'Final' },
      ],
    },
    {
      key: 'file',
      label: 'Subir archivo de informe',
      type: 'file',
      filesAccepted:'.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel',
      validations: [Validators.required],
    },
    {
      key: 'dateReport',
      label: 'Fecha de informe',
      type: 'date',
      required: true,
      validations: [Validators.required],
    },
  ],
  buttonLabel: 'Cargar reporte',
};
