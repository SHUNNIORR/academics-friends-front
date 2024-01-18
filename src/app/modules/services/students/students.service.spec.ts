import { TestBed } from '@angular/core/testing';

import { StudentsService } from './students.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('StudentsService', () => {
  let service: StudentsService;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StudentsService]
    });
    service = TestBed.inject(StudentsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    // Verificar que no haya solicitudes pendientes después de cada prueba
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should create students', () => {
    const mockStudents = new File(['mock content'], 'mock-students.csv');

    service.createStudents(mockStudents).subscribe((result) => {
      expect(result).toBeTruthy();
    });

    const req = httpTestingController.expectOne(`${service.API_URL}/student`);
    expect(req.request.method).toBe('POST');
    req.flush({ /* mock data */ });
  });

  it('should search for a student by code', () => {
    const mockCode = '123456';

    service.searchStudent(mockCode).subscribe((result) => {
      expect(result).toBeTruthy();
    });

    const req = httpTestingController.expectOne(`${service.API_URL}/student/find-by-code/${mockCode}`);
    expect(req.request.method).toBe('GET');
    req.flush({ /* mock data */ });
  });
});
