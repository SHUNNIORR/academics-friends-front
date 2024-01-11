import { Validators } from '@angular/forms';
import { DynamicFormData } from 'src/app/shared/models/DynamicFormData';

export const ASSIGN_SCHEDULE: DynamicFormData = {
  fields: [
    {
      key: 'academicFriendEmail',
      label: 'Correo electrónico',
      type: 'text',
      validations: [Validators.required, Validators.email],
    },
    {
        key: 'day',
        label: 'Dia',
        type: 'select',
        required: true,
        validations: [Validators.required],
        selectOptions: [
          { value: 'MONDAY', label: 'Lunes' },
          { value: 'TUESDAY', label: 'Martes' },
          { value: 'WEDNESDAY', label: 'Miércoles' },
          { value: 'THURSDAY', label: 'Jueves' },
          { value: 'FRIDAY', label: 'Viernes' },
        ],
    },
    {
        key: 'startTime',
        label: 'Hora de inicio',
        type: 'select',
        required: true,
        validations: [Validators.required],
        selectOptions: [
            { value: '06:00', label: '06:00' },
            { value: '07:00', label: '07:00' },
            { value: '08:00', label: '08:00' },
            { value: '09:00', label: '09:00' },
            { value: '10:00', label: '10:00' },
            { value: '11:00', label: '11:00' },
            { value: '14:00', label: '14:00' },
            { value: '15:00', label: '15:00' },
            { value: '16:00', label: '16:00' },
            { value: '17:00', label: '17:00' },
        ],
    },
    {
        key: 'endTime',
        label: 'Hora de finalización',
        type: 'select',
        required: true,
        validations: [Validators.required],
        selectOptions: [
            { value: '07:00', label: '07:00' },
            { value: '08:00', label: '08:00' },
            { value: '09:00', label: '09:00' },
            { value: '10:00', label: '10:00' },
            { value: '11:00', label: '11:00' },
            { value: '12:00', label: '12:00' },
            { value: '15:00', label: '15:00' },
            { value: '16:00', label: '16:00' },
            { value: '17:00', label: '17:00' },
            { value: '18:00', label: '18:00' },
        ],
    },
    
  ],
  buttonLabel: 'Asignar horario',
};
export const REPLY_ASSIGN_SCHEDULE: DynamicFormData = {
    fields: [
      {
          key: 'status',
          label: 'Estado',
          type: 'select',
          required: true,
          validations: [Validators.required],
          selectOptions: [
              { value: 'pass', label: 'Aprobado' },
              { value: 'rejected', label: 'Rechazado' },
          ],
      },
      
    ],
    buttonLabel: 'Responder',
  };
export const TABLE_COLUMNS_ASSIGN_SCHEDULE = [
    { label: 'Id', key: 'id' },
    { label: 'Correo', key: 'academicFriendEmail' },
    { label: 'Código', key: 'day' },
    { label: 'Curso', key: 'startTime' },
    { label: 'Inicio', key: 'endTime' },
    { label: 'Estado', key: 'status' },
  ];
  export const optionsTableAssignmentSchedule = [
    {
      id:"reply",
      label:"Atender asignación"
    }
  ]
