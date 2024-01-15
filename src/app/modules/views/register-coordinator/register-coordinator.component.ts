import { Component } from '@angular/core';
import { DynamicFormData } from 'src/app/shared/models/DynamicFormData';
import { CREATE_COORDINATOR } from '../../metadata/register-coordinator/register-coordinator.metadata';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { CoordinatorService } from '../../services/coordinator/coordinator.service';
import { CoreService } from 'src/app/core/services/core/core.service';
import { CreateCoordinatorResponse } from '../../models/Coordinator';

@Component({
  selector: 'app-register-coordinator',
  templateUrl: './register-coordinator.component.html',
  styleUrls: ['./register-coordinator.component.scss']
})
export class RegisterCoordinatorComponent {
  formConfig: DynamicFormData = CREATE_COORDINATOR

  constructor(private coordinatorService: CoordinatorService, private coreService:CoreService){

  }
  onFormSubmit(formData: any): void {
    this.createCoordinator(formData);
  }

  createCoordinator(formData:any){
    this.coordinatorService.createCoordinator(formData).subscribe({
      next:(res:CreateCoordinatorResponse)=>{
        this.coreService.showMessage(`Coordinador ${res.email} creado con exito`)
      },
      error:(err:any)=>{
        this.coreService.showMessage(`Ocurrió un problema: ${err.error.message}`)
      }
    })
  }
}
