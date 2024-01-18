import { TestBed } from '@angular/core/testing';

import { ConvocationService } from './convocation.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('ConvocationService', () => {
  let service: ConvocationService;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ConvocationService]
    });
    service = TestBed.inject(ConvocationService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    // Verificar que no haya solicitudes pendientes después de cada prueba
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should create a convocation', () => {
    const mockConvocation = { /* mock data for the convocation */ };

    service.createConvocation(mockConvocation).subscribe((result) => {
      // Aquí puedes realizar aserciones adicionales según la lógica de tu aplicación
      expect(result).toEqual(mockConvocation);
    });

    // Verificar que se realizó una solicitud POST al endpoint correcto
    const req = httpTestingController.expectOne(`${service.API_URL}/convocation`);
    expect(req.request.method).toBe('POST');

    // Proporcionar una respuesta simulada del servidor
    req.flush(mockConvocation);
  });

  it('should get active convocation', () => {
    const mockActiveConvocation = { /* mock data for the active convocation */ };

    service.getConvocationActive().subscribe((result) => {
      // Aquí puedes realizar aserciones adicionales según la lógica de tu aplicación
      expect(result).toEqual(mockActiveConvocation);
    });

    // Verificar que se realizó una solicitud GET al endpoint correcto
    const req = httpTestingController.expectOne(`${service.API_URL}/convocation/active`);
    expect(req.request.method).toBe('GET');

    // Proporcionar una respuesta simulada del servidor
    req.flush(mockActiveConvocation);
  });
});
