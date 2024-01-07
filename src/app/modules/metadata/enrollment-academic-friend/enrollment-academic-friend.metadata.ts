import { Validators } from '@angular/forms';
import { DynamicFormData } from 'src/app/shared/models/DynamicFormData';

export const ENROLLMENT: DynamicFormData = {
  fields: [
    {
      key: 'email',
      label: 'Correo institucional',
      type: 'text',
      validations: [Validators.required, Validators.email],
    },
    {
      key: 'classSchedule',
      label: 'Subir horario académico',
      type: 'file',
      filesAccepted: 'application/pdf, .pdf',
      validations: [Validators.required],
    },
    {
      key: 'resume',
      label: 'Subir hoja de vida',
      type: 'file',
      filesAccepted: 'application/pdf, .pdf',
      validations: [Validators.required],
    },
    {
      key: 'average',
      label: 'Promédio ponderado',
      type: 'number',
      validations: [
        Validators.required,
        Validators.pattern(/^\d+\.\d{1,2}$/),
        Validators.max(5),
      ],
    },
  ],
  buttonLabel: 'Incribirme a amigos académicos',
};
