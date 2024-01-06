import { FormControl, FormGroup } from "@angular/forms";

// dynamic-form.model.ts
export interface DynamicFormField {
    key: string;
    label: string;
    type: string;
    value?: any;
    required?: boolean;
    validations?: any[];
    selectOptions?:selectOption[];
    filesAccepted?: string;
    dateRange?: FormGroup;
    startDateName?: FormControl;
    endDateName?: FormControl;
  }

  interface selectOption{
    value:any;
    label:string;
  }
  
  export interface DynamicFormData {
    fields: DynamicFormField[],
    buttonLabel: string;
  }

  export function buildDateRangeFormGroup(startDateName: string, endDateName: string): FormGroup {
    return new FormGroup({
      start: new FormControl(startDateName),
      end: new FormControl(endDateName),
    });
  }