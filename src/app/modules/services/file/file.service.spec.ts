import { TestBed } from '@angular/core/testing';

import { FileService } from './file.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';

describe('FileService', () => {
  let fileService: FileService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FileService]
    });

    fileService = TestBed.inject(FileService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Verificar que no haya solicitudes pendientes después de cada prueba
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(fileService).toBeTruthy();
  });

  it('should download a file', () => {
    const fileUrl = 'example.txt';
    const apiUrl = `${environment.url}/file/${fileUrl}`;
    const mockBlob = new Blob(['fake data'], { type: 'text/plain' });

    // Llamar al método que se va a probar
    fileService.downloadFile(fileUrl).subscribe(response => {
      // Verificar que la respuesta sea un Blob
      expect(response instanceof Blob).toBeTruthy();
    });

    // Verificar que la solicitud HTTP sea la esperada
    const req = httpTestingController.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');

    // Simular la respuesta HTTP con el Blob mock
    req.flush(mockBlob);
  });

  it('should convert a file array', () => {
    const fileArray = [{}];
    const apiUrl = `${environment.url}/file/convert`;
    const mockBlob = new Blob(['fake converted data'], { type: 'text/plain' });

    // Llamar al método que se va a probar
    fileService.convertFile(fileArray).subscribe(response => {
      // Verificar que la respuesta sea un Blob
      expect(response instanceof Blob).toBeTruthy();
    });

    // Verificar que la solicitud HTTP sea la esperada
    const req = httpTestingController.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');

    // Simular la respuesta HTTP con el Blob mock
    req.flush(mockBlob);
  });
});
