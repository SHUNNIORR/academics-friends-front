import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, finalize, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router, private authService:AuthService, private _snackBar: MatSnackBar) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this._snackBar.open('Cargando...', 'Cerrar', {
      horizontalPosition: 'center',
      verticalPosition:'top',
      duration: 2000, // Puedes ajustar la duración según tus necesidades
    });
    const token: string|null = this.authService.getTokenFromLocal();
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `${token}`,
        },
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 || error.status === 403) {
          // Unauthorized or Forbidden error handling
          this.authService.logout();
          this.router.navigate(['/login']);
        }
        return throwError(error);
      }),
      finalize(()=>{
        console.log('')
      })
    );
  }
}
