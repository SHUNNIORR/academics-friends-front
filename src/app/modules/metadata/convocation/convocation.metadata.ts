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
  { label: 'Correo', key: 'email' },
  { label: 'Nombre', key: 'name' },
  { label: 'Código', key: 'code' },
  //{ label: 'Tipo', key: 'type' },
  { label: 'Semestre', key: 'semester' },
  //{ label: 'Estado', key: 'status' },
  //{ label: 'Hoja de vida', key: 'resume' },
  { label: 'Calificación', key: 'score' },
  { label: 'Promedio', key: 'average' },
  { label: 'Obervaciones', key: 'observations' },
  //{ label: 'Contrato', key: 'contract' }
];

export const optionsTableStudentRegistered = [
  {
    id:"downloadHV",
    label:"Descargar HV"
  },
  {
    id:"qualify",
    label:"Calificar"
  },
]
export const optionsTableStudentPass = [
  {
    id:"downloadHV",
    label:"Descargar HV"
  },
  {
    id:"downloadContract",
    label:"Descargar contrato"
  },
  {
    id:"uploadContract",
    label:"Cargar contrato"
  },
  {
    id:"resetPassword",
    label:"Reestablecer contraseña"
  }
]
export const optionsTableStudentApprove = [
  {
    id:"downloadHV",
    label:"Descargar HV"
  },
  {
    id:"approve",
    label:"Aprobar"
  },
]
export const QUALIFY_STUDENT: DynamicFormData = {
  fields: [
    {
      key: 'score',
      label: 'Califición percibida',
      type: 'number',
      validations: [Validators.required,Validators.pattern(/^(100|[1-9]?\d)$/)],
    },
    {
      key: 'observations',
      label: 'Observaciones',
      type: 'text',
      validations: [Validators.required],
    },
  ],
  buttonLabel: 'Calificar',
};
export const APPROVE_STUDENT: DynamicFormData = {
  fields: [
    {
      key: 'password',
      label: 'Contraseña',
      type: 'password',
      required: true,
      validations: [Validators.minLength(6)],
    },
  ],
  buttonLabel: 'Aprobar',
};
