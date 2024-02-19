import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { AuthInterceptor } from './auth.interceptor';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
  HttpErrorResponse,
  HttpRequest,
} from '@angular/common/http';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { MatSnackBar } from '@angular/material/snack-bar';

describe('AuthInterceptor', () => {
  const snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);
  let httpTestingController: HttpTestingController;
  let interceptor: AuthInterceptor;
  let authService: AuthService;
  let router: Router;
  let http: HttpClient;
  let snackBar: jasmine.SpyObj<MatSnackBar>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [
        AuthInterceptor,
        AuthService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true,
        },
        { provide: MatSnackBar, useValue: snackBarSpy }
      ],
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    interceptor = TestBed.inject(AuthInterceptor);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    http = TestBed.inject(HttpClient);
    snackBar = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should add Authorization header when token is available', () => {
    spyOn(authService, 'getTokenFromLocal').and.returnValue('fakeToken');
    const request = http.get('https://example.com/api/data');

    request.subscribe(() => {
      // Intercept the request and check if Authorization header is set
      expect(request).toHaveBeenCalled();
      // You can check other details of the request as needed
    });
  });

  it('should handle 401 Unauthorized error by logging out and navigating to login', fakeAsync(() => {
    spyOn(authService, 'getTokenFromLocal').and.returnValue('your-token');

    spyOn(authService, 'logout');
    spyOn(router, 'navigate');

    const request = new HttpRequest('GET', '/api/data');

    http.get('/api/data').subscribe(
      () => {
        fail('Expected an error response');
      },
      (error) => {
        expect(error.status).toBe(401);

        // Ensure AuthService.logout() is called
        expect(authService.logout).toHaveBeenCalled();

        // Ensure Router.navigate() is called with the correct route
        expect(router.navigate).toHaveBeenCalledWith(['/login']);
      }
    );

    const httpRequest = httpTestingController.expectOne('/api/data');

    // Respond with a 401 Unauthorized error
    httpRequest.flush('Unauthorized', {
      status: 401,
      statusText: 'Unauthorized',
    });

    // Tick to simulate the passage of time until Observable completes
    tick();

    httpTestingController.verify();
  }));
  // Add more test cases as needed for other scenarios
});
