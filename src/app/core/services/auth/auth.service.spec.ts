import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { LoginUser, LoginUserResponse } from '../../utils/models/LoginUser';
import { of } from 'rxjs';

describe('AuthService', () => {
  let service: AuthService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login successfully', () => {
    const userData: LoginUser = { email: 'user@example.com' ,
      password: '123' };
    const mockResponse: LoginUserResponse = { 
    jwt:'xxx',
    email: 'user@example.com',
    name: 'jperez',
    code: 'jperez',
    type: 'jperez'};

    service.login(userData).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(`${service.API_URL}/security/login`);
    expect(req.request.method).toEqual('POST');
    req.flush(mockResponse);

    httpTestingController.verify();
  });

  it('should logout successfully', () => {
    spyOn(service, 'deleteTokenFromLocal');
    spyOn(localStorage, 'removeItem');

    service.logout();

    expect(service.deleteTokenFromLocal).toHaveBeenCalled();
    expect(localStorage.removeItem).toHaveBeenCalledWith('role');
    expect(localStorage.removeItem).toHaveBeenCalledWith('name');
    expect(localStorage.removeItem).toHaveBeenCalledWith('email');
    expect(localStorage.removeItem).toHaveBeenCalledWith('token');
  });

  it('should save token to local storage', () => {
    spyOn(localStorage, 'setItem');

    const jwt = 'your-jwt-token';
    service.saveTokenToLocal(jwt);

    expect(localStorage.setItem).toHaveBeenCalledWith('token', jwt);
  });

  it('should delete token from local storage', () => {
    spyOn(localStorage, 'removeItem');

    service.deleteTokenFromLocal();

    expect(localStorage.removeItem).toHaveBeenCalledWith('token');
  });

  it('should get token from local storage', () => {
    spyOn(localStorage, 'getItem').and.returnValue('your-stored-token');

    const token = service.getTokenFromLocal();

    expect(token).toEqual('your-stored-token');
    expect(localStorage.getItem).toHaveBeenCalledWith('token');
  });

  it('should get health', () => {
    service.getHealth().subscribe();

    const req = httpTestingController.expectOne(`${service.API_URL}/health`);
    expect(req.request.method).toEqual('GET');
    req.flush({}); // You can provide a mock response if needed

    httpTestingController.verify();
  });

  it('should get user by email', () => {
    const email = 'user@example.com';
    service.getUserByEmail(email).subscribe();

    const req = httpTestingController.expectOne(`${service.API_URL}/user/${email}`);
    expect(req.request.method).toEqual('GET');
    req.flush({}); // You can provide a mock response if needed

    httpTestingController.verify();
  });

  it('should check permissions', () => {
    spyOn(localStorage, 'getItem').and.returnValue('admin'); // Assuming 'admin' is the role in local storage

    const hasPermission = service.hasPermission(['admin']);

    expect(hasPermission).toBeTruthy();
  });
});
