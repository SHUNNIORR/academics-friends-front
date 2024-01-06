import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicFormData } from 'src/app/shared/models/DynamicFormData';

export const SAVE_CONSULTANCY: DynamicFormData = {
  fields: [
    {
      key: 'studentCode',
      label: 'Código del estudiante',
      type: 'number',
      validations: [Validators.required],
    },
    {
      key: 'courseName',
      label: 'Curso',
      type: 'text',
      validations: [Validators.required],
    },
    {
        key: 'startDate',
        label: 'Fechas de inicio',
        type: 'date-time',
        required: true,
        validations: [Validators.required],
    },
    {
        key: 'endDate',
        label: 'Fechas de finalizacion',
        type: 'date-time',
        required: true,
        validations: [Validators.required],
    },
    {
      key: 'difficultiesEncountered',
      label: 'Difultades encontradas',
      type: 'text',
      validations: [Validators.required],
    },
    {
        key: 'aspectsToImprove',
        label: 'Aspectos a mejorar',
        type: 'text',
        validations: [Validators.required],
      },
  ],
  buttonLabel: 'Registrar coordinador',
};

export const TABLE_COLUMNS_NAME_CONSULTANCY = [
  { label: 'Correo', key: 'academicFriendEmail' },
  { label: 'Código', key: 'studentCode' },
  { label: 'Curso', key: 'courseName' },
  { label: 'Inicio', key: 'startDate' },
  { label: 'Fin', key: 'endDate' },
  { label: 'Dificultades encontradas', key: 'difficultiesEncountered' },
  { label: 'Aspectos a mejorar', key: 'aspectsToImprove' }
];
