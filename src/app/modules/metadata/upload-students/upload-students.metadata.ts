import { Validators } from "@angular/forms";
import { DynamicFormData } from "src/app/shared/models/DynamicFormData";

export const UPLOAD_STUDENTS: DynamicFormData = {
    fields: [
      {
        key: 'file',
        label: 'Cargar estudiantes',
        type: 'file',
        filesAccepted:'.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel',
        validations: [Validators.required],
      }
    ],
    buttonLabel: 'Cargar estudiantes',
  };
  export const SEARCH_STUDENTS: DynamicFormData = {
    fields: [
      {
        key: 'studentCode',
        label: 'Código del estudiante',
        type: 'number',
        validations: [Validators.required],
      }
    ],
    buttonLabel: 'Buscar estudiante',
  };