import { TestBed } from '@angular/core/testing';

import { AcademicFriendsService } from './academic-friends.service';
import { environment } from 'src/environments/environment';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('AcademicFriendsService', () => {
  let service: AcademicFriendsService;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AcademicFriendsService]
    });
    service = TestBed.inject(AcademicFriendsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should get all academic friends', () => {
    const apiUrl = `${environment.url}/academic-friend`;
    const mockResponse = {}

    // Llamar al método que se va a probar
    service.getAllAcademicFriends().subscribe(response => {
      // Verificar que la respuesta sea la esperada
      expect(response).toEqual(mockResponse);
    });

    // Verificar que la solicitud HTTP sea la esperada
    const req = httpTestingController.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');

    // Simular la respuesta HTTP con el mock de la respuesta
    req.flush(mockResponse);
  });
  it('should get all academic friends', () => {
    const apiUrl = `${environment.url}/user/email@ufps.edu.co`;
    const mockResponse = {}

    // Llamar al método que se va a probar
    service.getAcademicFriendByEmail('email@ufps.edu.co').subscribe(response => {
      // Verificar que la respuesta sea la esperada
      expect(response).toEqual(mockResponse);
    });

    // Verificar que la solicitud HTTP sea la esperada
    const req = httpTestingController.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');

    // Simular la respuesta HTTP con el mock de la respuesta
    req.flush(mockResponse);
  });
  it('should get all academic friends', () => {
    const apiUrl = `${environment.url}/academic-friend/find-by-convocation/1`;
    const mockResponse = {}

    // Llamar al método que se va a probar
    service.getAcademicFriendByConvocationActive(1).subscribe(response => {
      // Verificar que la respuesta sea la esperada
      expect(response).toEqual(mockResponse);
    });

    // Verificar que la solicitud HTTP sea la esperada
    const req = httpTestingController.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');

    // Simular la respuesta HTTP con el mock de la respuesta
    req.flush(mockResponse);
  });
  it('should get all academic friends', () => {
    const apiUrl = `${environment.url}/academic-friend`;
    const mockResponse = {}

    // Llamar al método que se va a probar
    service.updateAcademicFriend({}).subscribe(response => {
      // Verificar que la respuesta sea la esperada
      expect(response).toEqual(mockResponse);
    });

    // Verificar que la solicitud HTTP sea la esperada
    const req = httpTestingController.expectOne(apiUrl);
    expect(req.request.method).toBe('PUT');

    // Simular la respuesta HTTP con el mock de la respuesta
    req.flush(mockResponse);
  });
  it('should get all academic friends', () => {
    const apiUrl = `${environment.url}/academic-friend/1`;
    const mockResponse = {}

    // Llamar al método que se va a probar
    service.findAcademicFriendByCode(1).subscribe(response => {
      // Verificar que la respuesta sea la esperada
      expect(response).toEqual(mockResponse);
    });

    // Verificar que la solicitud HTTP sea la esperada
    const req = httpTestingController.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');

    // Simular la respuesta HTTP con el mock de la respuesta
    req.flush(mockResponse);
  });
  it('should upload a contract', () => {
    const file = new File(['contract data'], 'contract.pdf', { type: 'application/pdf' });
    const email = 'test@example.com';
    const apiUrl = `${environment.url}/academic-friend/contract`;
    const mockResponse = {};

    // Llamar al método que se va a probar
    service.uploadContract(file, email).subscribe(response => {
      // Verificar que la respuesta sea la esperada
      expect(response).toEqual(mockResponse);
    });

    // Verificar que la solicitud HTTP sea la esperada
    const req = httpTestingController.expectOne(apiUrl);
    expect(req.request.method).toBe('PUT');

    // Simular la respuesta HTTP con el mock de la respuesta
    req.flush(mockResponse);
  });
  it('should get all academic friends', () => {
    const apiUrl = `${environment.url}/user/reset-password`;
    const mockResponse = {}

    // Llamar al método que se va a probar
    service.resetPassword({}).subscribe(response => {
      // Verificar que la respuesta sea la esperada
      expect(response).toEqual(mockResponse);
    });

    // Verificar que la solicitud HTTP sea la esperada
    const req = httpTestingController.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');

    // Simular la respuesta HTTP con el mock de la respuesta
    req.flush(mockResponse);
  });
});
