import { TestBed } from '@angular/core/testing';

import { ConsultancyService } from './consultancy.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('ConsultancyService', () => {
  let service: ConsultancyService;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ConsultancyService]
    });
    service = TestBed.inject(ConsultancyService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    // Verificar que no haya solicitudes pendientes después de cada prueba
    httpTestingController.verify();
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should save a consultancy', () => {
    const mockConsultancy = { /* mock data for the consultancy */ };
    
    service.saveConsultancy(mockConsultancy).subscribe((result) => {
      // Aquí puedes realizar aserciones adicionales según la lógica de tu aplicación
      expect(result).toBeTruthy();
    });

    // Verificar que se realizó una solicitud POST al endpoint correcto con los datos correctos
    const req = httpTestingController.expectOne(`${service.API_URL}/consultancy`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockConsultancy);

    // Proporcionar una respuesta simulada del servidor
    req.flush({ /* mock data for the response */ });
  });
  it('should get all consultancy by email', () => {
    const mockEmail = 'test@example.com';
    const mockConsultancies:any = [/* mock data for the consultancies */];

    service.getAllConsultancyByEmail(mockEmail).subscribe((result) => {
      // Aquí puedes realizar aserciones adicionales según la lógica de tu aplicación
      expect(result).toEqual(mockConsultancies);
    });

    // Verificar que se realizó una solicitud GET al endpoint correcto
    const req = httpTestingController.expectOne(`${service.API_URL}/consultancy/find-by-academic-friend/${mockEmail}`);
    expect(req.request.method).toBe('GET');

    // Proporcionar una respuesta simulada del servidor
    req.flush(mockConsultancies);
  });
  it('should find consultancy between dates', () => {
    const initialDate = '2022-01-01';
    const finalDate = '2022-02-01';
    const mockConsultancies:any = [/* mock data for the consultancies */];

    service.findConsultancyBetweenDates(initialDate, finalDate).subscribe((result) => {
      // Aquí puedes realizar aserciones adicionales según la lógica de tu aplicación
      expect(result).toEqual(mockConsultancies);
    });

    // Verificar que se realizó una solicitud GET al endpoint correcto
    const req = httpTestingController.expectOne(`${service.API_URL}/consultancy/find-between-dates/${initialDate}/${finalDate}`);
    expect(req.request.method).toBe('GET');

    // Proporcionar una respuesta simulada del servidor
    req.flush(mockConsultancies);
  });
  it('should find consultancy by course', () => {
    const courseName = 'ExampleCourse';
    const mockConsultancies:any = [/* mock data for the consultancies */];

    service.findConsultancyCourse(courseName).subscribe((result) => {
      // Aquí puedes realizar aserciones adicionales según la lógica de tu aplicación
      expect(result).toEqual(mockConsultancies);
    });

    // Verificar que se realizó una solicitud GET al endpoint correcto
    const req = httpTestingController.expectOne(`${service.API_URL}/consultancy/find-by-course/${courseName}`);
    expect(req.request.method).toBe('GET');

    // Proporcionar una respuesta simulada del servidor
    req.flush(mockConsultancies);
  });

  it('should get simple consultancy stats', () => {
    const mockStats = { /* mock data for the stats */ };

    service.getSimpleConsultancyStats().subscribe((result) => {
      // Aquí puedes realizar aserciones adicionales según la lógica de tu aplicación
      expect(result).toEqual(mockStats);
    });

    // Verificar que se realizó una solicitud GET al endpoint correcto
    const req = httpTestingController.expectOne(`${service.API_URL}/consultancy/count-between-date-ranges`);
    expect(req.request.method).toBe('GET');

    // Proporcionar una respuesta simulada del servidor
    req.flush(mockStats);
  });

});
