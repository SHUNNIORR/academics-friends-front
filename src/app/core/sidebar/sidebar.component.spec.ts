import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, ViewChild } from '@angular/core';
import { of } from 'rxjs';

import { SidebarComponent } from './sidebar.component';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { CoreService } from '../services/core/core.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { Router, RouterModule } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';

const authServiceStub = {
  isAuthenticated: true,
  logout: jasmine.createSpy('logout'),
  getTokenFromLocal: jasmine
    .createSpy('getTokenFromLocal')
    .and.returnValue('your-token'),
  // Add other methods or properties as needed
};

const breakpointObserverStub = {
  observe: jasmine.createSpy('observe').and.returnValue(of({ matches: false })),
  // Add other methods or properties as needed
};

@Component({
  selector: 'app-host',
  template: '<app-sidebar></app-sidebar>',
})
class TestHostComponent {}

describe('SidebarComponent', () => {
  let coreServiceStub: Partial<CoreService> = {
    sidenavToggle$: of(),
      toggleSidenav: jasmine.createSpy('toggleSidenav'),
      // Add other methods or properties as needed
  };
  let component: SidebarComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let coreService: CoreService;
  let authService: AuthService;
  let router: Router;
  beforeEach(() => {
    
    TestBed.configureTestingModule({
      imports: [
        MatSidenavModule,
        BrowserAnimationsModule,
        MatListModule,
        MatExpansionModule,
        RouterModule,
        HttpClientTestingModule,
        MatSnackBarModule
      ],
      declarations: [SidebarComponent, TestHostComponent],
      providers: [
         AuthService, Router,CoreService
      ],
    });

    fixture = TestBed.createComponent(TestHostComponent);
    coreService = TestBed.inject(CoreService);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    component = fixture.debugElement.children[0].componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle sidenav when sidenavToggle$ emits', () => {
    coreServiceStub.sidenavToggle$ = of();
    spyOn(component.sidenav, 'toggle');

    component.ngAfterViewInit();

    coreServiceStub.sidenavToggle$.subscribe(() => {
      expect(component.sidenav.toggle).toHaveBeenCalled();
    });
  });

  it('should observe breakpoints and set esDispositivoMovil accordingly', () => {
    breakpointObserverStub.observe.and.returnValue(of({ matches: true }));

    component.ngOnInit();

    expect(component.esDispositivoMovil).toBe(true);
  });
  it('should toggle sidenav when sidenavToggle$ emits', () => {
    coreServiceStub.sidenavToggle$ = of();
    const spy = spyOn(component.sidenav, 'toggle');
    component.ngAfterViewInit();
    coreServiceStub.sidenavToggle$.subscribe(() => {
      expect(spy).toHaveBeenCalled()
    })

    
  });  
  // Add more test cases as needed
});
