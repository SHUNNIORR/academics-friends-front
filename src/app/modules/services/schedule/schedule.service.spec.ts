import { TestBed } from '@angular/core/testing';

import { ScheduleService } from './schedule.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('ScheduleService', () => {
  let service: ScheduleService;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ScheduleService]
    });
    service = TestBed.inject(ScheduleService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    // Verificar que no haya solicitudes pendientes después de cada prueba
    httpTestingController.verify();
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should get all schedules', () => {
    service.getAllSchedule().subscribe((result) => {
      expect(result).toBeTruthy();
    });

    const req = httpTestingController.expectOne(`${service.API_URL}/schedule`);
    expect(req.request.method).toBe('GET');
    req.flush({ /* mock data */ });
  });

  it('should save a schedule', () => {
    const mockSchedule = {};

    service.saveSchedule(mockSchedule).subscribe((result) => {
      expect(result).toBeTruthy();
    });

    const req = httpTestingController.expectOne(`${service.API_URL}/schedule`);
    expect(req.request.method).toBe('POST');
    req.flush({ /* mock data */ });
  });

  it('should get schedules by email', () => {
    const mockEmail = 'test@example.com';

    service.getSchedulesByEmail(mockEmail).subscribe((result) => {
      expect(result).toBeTruthy();
    });

    const req = httpTestingController.expectOne(`${service.API_URL}/schedule/find-by-academic-friend/${mockEmail}`);
    expect(req.request.method).toBe('GET');
    req.flush({ /* mock data */ });
  });

  it('should assign a schedule', () => {
    const mockReplyObj = {};

    service.assignSchedule(mockReplyObj).subscribe((result) => {
      expect(result).toBeTruthy();
    });

    const req = httpTestingController.expectOne(`${service.API_URL}/schedule/add-academic-friend`);
    expect(req.request.method).toBe('POST');
    req.flush({ /* mock data */ });
  });
});
