import { Validators } from "@angular/forms";
import { DynamicFormData } from "src/app/shared/models/DynamicFormData";

export const SEARCH_ACADEMIC_FRIEND: DynamicFormData = {
    fields: [
      {
        key: 'academicFriendCode',
        label: 'Código del amigo académico',
        type: 'number',
        validations: [Validators.required],
      }
    ],
    buttonLabel: 'Buscar estudiante',
  };
export const SEARCH_ACADEMIC_FRIEND_BY_EMAIL: DynamicFormData = {
    fields: [
      {
        key: 'academicFriendEmail',
        label: 'Correo del amigo académico',
        type: 'text',
        validations: [Validators.required, Validators.email],
      }
    ],
    buttonLabel: 'Buscar estudiante',
  };
  export const UPLOAD_CONTRACT: DynamicFormData = {
    fields: [
      {
        key: 'contract',
        label: 'Cargar contrato',
        type: 'file',
        filesAccepted: 'application/pdf, .pdf',
        validations: [Validators.required],
      },
    ],
    buttonLabel: 'Cargar contrato',
  };
  