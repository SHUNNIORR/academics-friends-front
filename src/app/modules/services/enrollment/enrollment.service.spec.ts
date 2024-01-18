import { TestBed } from '@angular/core/testing';

import { EnrollmentService } from './enrollment.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EnrollStudentRequest } from '../../models/Student';

describe('EnrollmentService', () => {
  let service: EnrollmentService;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EnrollmentService]
    });
    service = TestBed.inject(EnrollmentService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    // Verificar que no haya solicitudes pendientes después de cada prueba
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should enroll a student', () => {
    const mockStudent: EnrollStudentRequest = {
      resume: new File([/* content of the file */], 'resume.pdf'),
      email: 'test@example.com',
      average: 90.5,
      classSchedule: new File([],'')
    };

    service.enrollStudent(mockStudent).subscribe((result) => {
      // Aquí puedes realizar aserciones adicionales según la lógica de tu aplicación
      expect(result).toBeTruthy();
    });

    // Verificar que se realizó una solicitud POST al endpoint correcto
    const req = httpTestingController.expectOne(`${service.API_URL}/academic-friend`);
    expect(req.request.method).toBe('POST');

    // Proporcionar una respuesta simulada del servidor
    req.flush({ /* mock data */ });
  });
});
