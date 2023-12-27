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
  }

  interface selectOption{
    value:any;
    label:string;
  }
  
  export interface DynamicFormData {
    fields: DynamicFormField[],
    buttonLabel: string;
  }