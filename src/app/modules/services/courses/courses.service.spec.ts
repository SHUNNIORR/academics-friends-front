import { TestBed } from '@angular/core/testing';

import { CoursesService } from './courses.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('CoursesService', () => {
  let service: CoursesService;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CoursesService]
    });
    service = TestBed.inject(CoursesService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    // Verificar que no haya solicitudes pendientes después de cada prueba
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should create courses', () => {
    const mockCoursesFile = new File([/* content of the file */], 'courses.csv');

    service.createCourses(mockCoursesFile).subscribe((result) => {
      // Aquí puedes realizar aserciones adicionales según la lógica de tu aplicación
      expect(result).toBeTruthy();
    });

    // Verificar que se realizó una solicitud POST al endpoint correcto
    const req = httpTestingController.expectOne(`${service.API_URL}/course`);
    expect(req.request.method).toBe('POST');

    // Proporcionar una respuesta simulada del servidor
    req.flush({ /* mock data */ });
  });

  it('should get all courses', () => {
    const mockCourses:any = [/* mock data for courses */];

    service.getAllCourses().subscribe((result) => {
      // Aquí puedes realizar aserciones adicionales según la lógica de tu aplicación
      expect(result).toEqual(mockCourses);
    });

    // Verificar que se realizó una solicitud GET al endpoint correcto
    const req = httpTestingController.expectOne(`${service.API_URL}/course`);
    expect(req.request.method).toBe('GET');

    // Proporcionar una respuesta simulada del servidor
    req.flush(mockCourses);
  });
});
