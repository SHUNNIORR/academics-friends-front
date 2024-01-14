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
    // {
    //   key: 'courseName',
    //   label: 'Curso',
    //   type: 'text',
    //   validations: [Validators.required],
    // },
    {
      key: 'courseName',
      label: 'Curso',
      type: 'select',
      required: true,
      validations: [Validators.required],
      selectOptions: [],
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

export const FIND_CONSULTANCY_BY_COURSE: DynamicFormData = {
  fields: [
    {
      key: 'courseName',
      label: 'Curso',
      type: 'select',
      required: true,
      validations: [Validators.required],
      selectOptions: [],
    },
  ],
  buttonLabel: 'Busar curso',
};

export const FIND_CONSULTANCY_BY_SEMESTER: DynamicFormData = {
  fields: [
    {
      key: 'semester',
      label: 'Semestre',
      type: 'select',
      required: true,
      validations: [Validators.required],
      selectOptions: [],
    },
  ],
  buttonLabel: 'Buscar',
};

export const TABLE_COLUMNS_NAME_CONSULTANCY = [
  { label: 'Amigo académico', key: 'academicFriendEmail' },
  { label: 'Código estudiante', key: 'studentCode' },
  { label: 'Curso', key: 'courseName' },
  { label: 'Inicio', key: 'startDate' },
  { label: 'Fin', key: 'endDate' },
  { label: 'Dificultades encontradas', key: 'difficultiesEncountered' },
  { label: 'Aspectos a mejorar', key: 'aspectsToImprove' },
];
