import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ReportService } from './report.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('ReportService', () => {
  let service: ReportService;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ReportService]
    });
    service = TestBed.inject(ReportService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should save a report', () => {
    const mockReport ={};

    service.saveReport(mockReport).subscribe((result) => {
      // Aquí puedes realizar aserciones adicionales según la lógica de tu aplicación
      expect(result).toBeTruthy();
    });

    const req = httpTestingController.expectOne(`${service.API_URL}/report`);
    expect(req.request.method).toBe('POST');
    req.flush({ /* mock data */ });
  });

  it('should get all reports', () => {
    service.getAllReports().subscribe((result) => {
      // Aquí puedes realizar aserciones adicionales según la lógica de tu aplicación
      expect(result).toBeTruthy();
    });

    const req = httpTestingController.expectOne(`${service.API_URL}/report`);
    expect(req.request.method).toBe('GET');
    req.flush({ /* mock data */ });
  });
  

  it('should correct a report', fakeAsync(() => {
    const mockFile = new File(['mock content'], 'mock-report.docx');
    const mockReportId = 1;

    service.correctReport(mockReportId, mockFile).subscribe((result) => {
      expect(result).toBeTruthy();
    });

    const req = httpTestingController.expectOne(`${service.API_URL}/report/${mockReportId}`);
    expect(req.request.method).toBe('PUT');
    req.flush({ /* mock data */ });

    // Necesario para simular el tiempo cuando se utilizan observables y se llama a tick en el código
    tick();
  }));

  it('should get reports by academic friend', () => {
    const mockAcademicFriendEmail = 'test@example.com';

    service.getReportsByAcademicFriend(mockAcademicFriendEmail).subscribe((result) => {
      expect(result).toBeTruthy();
    });

    const req = httpTestingController.expectOne(`${service.API_URL}/report/find-by-academic-friend/${mockAcademicFriendEmail}`);
    expect(req.request.method).toBe('GET');
    req.flush({ /* mock data */ });
  });

  it('should notify on report updated', () => {
    const spy = jasmine.createSpy('spy');
    const subscription = service.onReportUpdated().subscribe(spy);
  
    // Realizar una acción que notificará una actualización (por ejemplo, llamar a updateReport)
    service.updateReport({}).subscribe(() => {
      // Asegúrate de que el espía haya sido llamado después de la actualización
      expect(spy).toHaveBeenCalled();
  
      // Manejar la solicitud PUT
      const req = httpTestingController.expectOne(`${service.API_URL}/report`);
      expect(req.request.method).toBe('PUT');
      req.flush({ });
  
      subscription.unsubscribe(); // Asegúrate de desuscribirte después de la prueba
    });
  });
  it('should update a report', () => {
    const mockReport = {};

    service.updateReport(mockReport).subscribe((result) => {
      expect(result).toBeTruthy();
    });

    const req = httpTestingController.expectOne(`${service.API_URL}/report`);
    expect(req.request.method).toBe('PUT');
    req.flush({ /* mock data */ });
  });
});
