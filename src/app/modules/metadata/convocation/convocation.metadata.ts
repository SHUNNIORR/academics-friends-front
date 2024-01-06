import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicFormData } from 'src/app/shared/models/DynamicFormData';

export const CREATE_CONVOCATION: DynamicFormData = {
  fields: [
    {
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
    },
    {
      key: 'evaluationDate',
      label: 'Fecha de evaluación',
      type: 'date',
      required: true,
      validations: [Validators.required],
    },
    {
      key: 'resultsReleaseDate',
      label: 'Fecha de entrega de resultados',
      type: 'date',
      required: true,
      validations: [Validators.required],
    },
  ],
  buttonLabel: 'Crear convocatoria',
};

export interface Convocation {
  id:                 number;
  openingDate:        Date;
  closingDate:        Date;
  evaluationDate:     Date;
  resultsReleaseDate: Date;
}

export const TABLE_COLUMNS_NAME_CONVOCATION = [
  { label: 'Id', key: 'id' },
  { label: 'Fecha de apertura', key: 'openingDate' },
  { label: 'Fecha de cierre', key: 'closingDate' },
  { label: 'Fecha de evaluación', key: 'evaluationDate' },
  { label: 'Fecha de entrega de resultados', key: 'resultsReleaseDate' },
];

export const TABLE_COLUMNS_NAME_STUDENTS = [
  { label: 'Id', key: 'id' },
  { label: 'Fecha de apertura', key: 'openingDate' },
  { label: 'Fecha de cierre', key: 'closingDate' },
  { label: 'Fecha de evaluación', key: 'evaluationDate' },
  { label: 'Fecha de entrega de resultados', key: 'resultsReleaseDate' },
];
