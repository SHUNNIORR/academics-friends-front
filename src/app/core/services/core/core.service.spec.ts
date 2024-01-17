import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject, take } from 'rxjs';
import { CoreService } from './core.service';

describe('CoreService', () => {
  let service: CoreService;
  let snackBar: jasmine.SpyObj<MatSnackBar>;

  beforeEach(() => {
    const snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    TestBed.configureTestingModule({
      providers: [
        CoreService,
        { provide: MatSnackBar, useValue: snackBarSpy }
      ]
    });

    service = TestBed.inject(CoreService);
    snackBar = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should toggle sidenav', () => {
    const sidenavToggleSpy = spyOn(service, 'toggleSidenav');

    service.toggleSidenav();

    expect(sidenavToggleSpy).toHaveBeenCalled();
  });

  it('should emit value when sidenav is toggled', (done) => {
    service.sidenavToggle$.pipe(take(1)).subscribe(() => {
      done();
    });

    service.toggleSidenav();
  });

  it('should show message with snackbar', () => {
    const message = 'Test Message';

    service.showMessage(message);

    expect(snackBar.open).toHaveBeenCalledWith(
      message,
      'X',
      jasmine.objectContaining({
        horizontalPosition: service['horizontalPosition'],
        verticalPosition: service['verticalPosition'],
        duration: service['durationInSeconds'] * 1000
      })
    );
  });
});
