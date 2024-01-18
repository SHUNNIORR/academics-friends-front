import { TestBed } from '@angular/core/testing';

import { CoordinatorService } from './coordinator.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CreateCoordinatorRequest, CreateCoordinatorResponse } from '../../models/Coordinator';

describe('CoordinatorService', () => {
  let service: CoordinatorService;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CoordinatorService]
    });
    service = TestBed.inject(CoordinatorService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    // Verificar que no haya solicitudes pendientes después de cada prueba
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should get active convocation', () => {
    const mockActiveConvocation:CreateCoordinatorRequest = { /* mock data for the active convocation */ } as CreateCoordinatorRequest;

    service.createCoordinator(mockActiveConvocation).subscribe((result) => {
      // Aquí puedes realizar aserciones adicionales según la lógica de tu aplicación
      expect(result).toEqual({} as CreateCoordinatorResponse);
    });

    // Verificar que se realizó una solicitud GET al endpoint correcto
    const req = httpTestingController.expectOne(`${service.API_URL}/coordinator`);
    expect(req.request.method).toBe('POST');

    // Proporcionar una respuesta simulada del servidor
    req.flush(mockActiveConvocation);
  });
});
