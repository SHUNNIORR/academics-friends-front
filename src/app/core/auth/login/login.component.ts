import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { DynamicFormData } from 'src/app/shared/models/DynamicFormData';
import { AuthService } from '../../services/auth/auth.service';
import { LoginUserResponse } from '../../utils/models/LoginUser';
import { CoreService } from '../../services/core/core.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  esDispositivoMovil: boolean = false;
  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    private router: Router,
    private coreService:CoreService
  ) {}
  ngOnInit() {
    // Observa los cambios en los breakpoints
    this.breakpointObserver
      .observe([Breakpoints.Handset, Breakpoints.Tablet])
      .subscribe((result) => {
        this.esDispositivoMovil = result.matches;
      });
  }
  formConfig: DynamicFormData = {
    fields: [
      {
        key: 'email',
        label: 'Correo',
        type: 'text',
        required: true,
        validations: [Validators.minLength(3), Validators.email],
      },
      {
        key: 'password',
        label: 'Contraseña',
        type: 'password',
        required: true,
        validations: [Validators.minLength(6)],
      },
    ],
    buttonLabel: 'Ingresar',
  };

  onFormSubmit(formData: any): void {
    console.log('Form submitted with data:', formData);
    this.authService
      .login(formData)
      .subscribe({ next: (res:LoginUserResponse) => {
        console.log(res)
        this.authService.saveTokenToLocal(res.jwt);
        this.router.navigate(['/dashboard'])
        localStorage.setItem("email", res.email);
        localStorage.setItem("name", res.name);
        localStorage.setItem("role",res.type)
        localStorage.setItem("code",res.code)
        this.coreService.showMessage('Bienvenido a Amigos a acádemicos');
      },
      error: () => {
        this.coreService.showMessage('Hubo un error');
      } });
    // Implementar lógica adicional según tus necesidades
  }
}
