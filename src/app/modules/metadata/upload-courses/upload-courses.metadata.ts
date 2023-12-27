import { Validators } from "@angular/forms";
import { DynamicFormData } from "src/app/shared/models/DynamicFormData";

export const UPLOAD_COURSES: DynamicFormData = {
    fields: [
      {
        key: 'file',
        label: 'Cargar cursos',
        type: 'file',
        filesAccepted:'.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel',
        validations: [Validators.required],
      }
    ],
    buttonLabel: 'Cargar cursos',
  };