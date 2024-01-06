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