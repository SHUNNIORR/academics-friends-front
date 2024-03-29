import { AuthService } from './../../services/auth/auth.service';
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { DynamicFormData } from 'src/app/shared/models/DynamicFormData';
import { CoreService } from '../../services/core/core.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent {
  toggleForms = true;

  constructor(
    private authService: AuthService,
    private coreService: CoreService,
    private router: Router
  ) {}

  sendCodeFormConfig: DynamicFormData = {
    fields: [
      {
        key: 'email',
        label: 'Correo',
        type: 'text',
        required: true,
        validations: [Validators.minLength(3), Validators.email],
      },
    ],
    buttonLabel: 'Enviar',
  };

  recoverFormConfig: DynamicFormData = {
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
        label: 'Nueva contraseña',
        type: 'password',
        required: true,
        validations: [Validators.minLength(6)],
      },
      {
        key: 'code',
        label: 'Código de recuperación',
        type: 'number',
        required: true,
        validations: [Validators.minLength(6)],
      },
    ],
    buttonLabel: 'Enviar',
  };

  sendCode(event: any) {
    this.authService.forgotPassword(event).subscribe({
      next: (response: any) => {
        // Verificar si la respuesta es un JSON válido
        try {
          JSON.parse(response);
          // Si no hay errores al parsear, la respuesta es un JSON válido
          this.coreService.showMessage(
            'Código enviado, revisa tu correo spam.'
          );
          this.toggleForms = !this.toggleForms;
        } catch (error) {
          console.log('Error al parsear JSON:', error);
          // Si hay un error al parsear, la respuesta no es un JSON válido,
          // podemos ignorarla y no hacer nada aquí
        }
      },
      error: (error: any) => {
        if (error instanceof HttpErrorResponse && error.status === 200) {
          // Si recibimos un código de estado 200 pero no se pudo analizar la respuesta,
          // tratamos la respuesta como una cadena y la manejamos como si fuera un JSON válido
          this.coreService.showMessage('Código enviado, revisa tu correo spam.');
          this.toggleForms = !this.toggleForms;
      } else {
          // Manejar otros errores de red u otros tipos de errores
          console.log('Error:', error);
          this.coreService.showMessage(
              'Ha sucedido un error con el servicio, intenta de nuevo.'
          );
      }
      },
    });
  }
  resetPassword(event: any) {
    this.authService.resetPassword(event).subscribe({
      next: () => {
        this.coreService.showMessage('Contraseña recuperada, logueate!');
        this.router.navigate(['/login']);
      },
      error: (error: any) => {
        if (error instanceof HttpErrorResponse && error.status === 200) {
          // Si recibimos un código de estado 200 pero no se pudo analizar la respuesta,
          // tratamos la respuesta como una cadena y la manejamos como si fuera un JSON válido
          this.coreService.showMessage('Contraseña recuperada, logueate!');
          this.router.navigate(['/login']);
      } else {
          // Manejar otros errores de red u otros tipos de errores
          console.log('Error:', error);
          this.coreService.showMessage(
              'Ha sucedido un error con el servicio, intenta de nuevo.'
          );
      }
      },
    });
  }
  toggleViews() {
    this.toggleForms = !this.toggleForms;
  }
}
