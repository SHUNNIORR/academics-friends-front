import { Validators } from '@angular/forms';
import { DynamicFormData } from 'src/app/shared/models/DynamicFormData';

export const CREATE_COORDINATOR: DynamicFormData = {
  fields: [
    {
      key: 'code',
      label: 'Código coordinador',
      type: 'text',
      validations: [Validators.required],
    },
    {
      key: 'name',
      label: 'Nombre',
      type: 'text',
      validations: [Validators.required],
    },
    {
      key: 'email',
      label: 'Correo electrónico',
      type: 'text',
      validations: [Validators.required, Validators.email],
    },
    {
      key: 'password',
      label: 'Contraseña',
      type: 'password',
      validations: [Validators.required],
    },
  ],
  buttonLabel: 'Registrar coordinador',
};
