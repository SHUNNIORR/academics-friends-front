import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { CoreService } from '../services/core/core.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatToolbarModule } from '@angular/material/toolbar';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let coreService: CoreService;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [MatIconModule, MatMenuModule, MatSnackBarModule,MatToolbarModule,HttpClientTestingModule,BrowserAnimationsModule],
      providers: [CoreService, AuthService, Router]
    });
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    coreService = TestBed.inject(CoreService);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call coreService.toggleSidenav on toggleSidenav()', () => {
    spyOn(coreService, 'toggleSidenav');
    component.toggleSidenav();
    expect(coreService.toggleSidenav).toHaveBeenCalled();
  });

  it('should call authService.logout and navigate to /login on logout()', () => {
    spyOn(authService, 'logout');
    spyOn(router, 'navigate');
    component.logout();
    expect(authService.logout).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should navigate to /dashboard/perfil on goToProfile()', () => {
    spyOn(router, 'navigate');
    component.goToProfile();
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard/perfil']);
  });
});
