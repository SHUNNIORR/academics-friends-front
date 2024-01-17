import { CoreService } from './../../services/core/core.service';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoginComponent } from './login.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SharedModule } from 'src/app/shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let router: Router
  let coreService:CoreService
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [HttpClientTestingModule, MatSnackBarModule, SharedModule, BrowserAnimationsModule],
      providers:[AuthService, CoreService, Router]
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    coreService = TestBed.inject(CoreService);
    // spyOn(authService, 'login').and.returnValue(of({jwt: 'xxxx',
    //   email: 'test@example.com',
    //   name: 'jperez',
    //   code: 'jperez',
    //   type: 'jperez'}));
    // spyOn(router, 'navigate'); // Spy on router.navigate
    // spyOn(coreService, 'showMessage');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call login service and navigate on successful login', fakeAsync(() => {
    spyOn(authService, 'login').and.returnValue(of({jwt: 'xxxx',
      email: 'test@example.com',
      name: 'jperez',
      code: 'jperez',
      type: 'jperez'}));
    spyOn(router, 'navigate'); // Spy on router.navigate
    spyOn(coreService, 'showMessage');
    const formData = { email: 'test@example.com', password: 'password' };
    component.onFormSubmit(formData);
    tick(); // Advance the fakeAsync zone to allow observables to emit

    expect(authService.login).toHaveBeenCalledWith(formData);
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
    expect(localStorage.getItem('email')).toEqual('test@example.com');
    // Add similar expectations for other localStorage items
    expect(coreService.showMessage).toHaveBeenCalledWith('Bienvenido a Amigos a acádemicos');
  }));
  it('should show error message on login error', fakeAsync(() => {
    spyOn(router, 'navigate'); // Spy on router.navigate
    spyOn(coreService, 'showMessage');
    const formData = { email: 'test@example.com', password: 'password' };
    const errorResponse = { status: 401 };
    spyOn(authService, 'login').and.returnValue(throwError(errorResponse));
    component.onFormSubmit(formData);
    tick();

    expect(authService.login).toHaveBeenCalledWith(formData);
    expect(coreService.showMessage).toHaveBeenCalledWith('Credenciales no válidas, por favor verifíquelas');
  }));

  it('should show generic error message on other errors', fakeAsync(() => {
    spyOn(router, 'navigate'); // Spy on router.navigate
    spyOn(coreService, 'showMessage');
    const formData = { email: 'test@example.com', password: 'password' };
    const errorResponse = { status: 500, error: { message: 'Internal Server Error' } };
    spyOn(authService, 'login').and.returnValue(throwError(errorResponse));
    component.onFormSubmit(formData);
    tick();

    expect(authService.login).toHaveBeenCalledWith(formData);
    expect(coreService.showMessage).toHaveBeenCalledWith('Hubo un error:Internal Server Error');
  }));

});
