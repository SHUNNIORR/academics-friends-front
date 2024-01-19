import { AuthService } from 'src/app/core/services/auth/auth.service';
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';

import { authGuardGuard } from './auth-guard.guard';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('authGuardGuard', () => {
  let authService: AuthService;
  let router: Router;
  let canActivate: CanActivateFn;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [AuthService], // Add AuthService to the testing module
    });

    canActivate = authGuardGuard;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(canActivate).toBeTruthy();
  });

  // it('should allow navigation when permission is granted', () => {
  //   const expectedRole = ['admin'];
  //   const route: ActivatedRouteSnapshot = {
  //     data: {
  //       expectedRole: [''],
  //     },
  //     url: [],
  //     params: {},
  //     queryParams: {},
  //     fragment: '',
  //     outlet: '',
  //     component: null,
  //     routeConfig: null,
  //     title: undefined,
  //     root: new ActivatedRouteSnapshot,
  //     parent: null,
  //     firstChild: null,
  //     children: [],
  //     pathFromRoot: [],
  //     paramMap: {}as any,
  //     queryParamMap: {}as any
  //   };
  //   const state = {} as any;

  //   spyOn(authService, 'hasPermission').and.returnValue(true); // Mock hasPermission

  //   const canActivateResult = canActivate(route, state);

  //   expect(canActivateResult).toBeTruthy();
  //   expect(authService.hasPermission).toHaveBeenCalledWith(expectedRole);
  //   expect(router.navigate).not.toHaveBeenCalled(); // Navigation shouldn't happen
  // });

  // it('should navigate to login when permission is not granted', () => {
  //   const expectedRole = ['user'];
  //   const route: ActivatedRouteSnapshot = {
  //     data: {
  //       expectedRole: ['user'],
  //     },
  //     url: [],
  //     params: {},
  //     queryParams: {},
  //     fragment: '',
  //     outlet: '',
  //     component: null,
  //     routeConfig: null,
  //     title: undefined,
  //     root: new ActivatedRouteSnapshot,
  //     parent: null,
  //     firstChild: null,
  //     children: [],
  //     pathFromRoot: [],
  //     paramMap: {}as any,
  //     queryParamMap: {}as any
  //   };
  //   const state = {} as any;

  //   spyOn(authService, 'hasPermission').and.returnValue(false); // Mock hasPermission
  //   spyOn(router, 'navigate'); // Spy on router.navigate

  //   const canActivateResult = canActivate(route, state);

  //   expect(canActivateResult).toBeFalsy();
  //   expect(authService.hasPermission).toHaveBeenCalledWith(expectedRole);
  //   expect(router.navigate).toHaveBeenCalledWith(['/login']); // Assert navigation to login
  // });
});
