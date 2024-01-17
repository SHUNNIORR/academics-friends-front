import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';

import { authGuardGuard } from './auth-guard.guard';

describe('authGuardGuard', () => {
  let canActivate: CanActivateFn;
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
    canActivate = authGuardGuard
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
  it('should always return true', () => {
    const route = {} as ActivatedRouteSnapshot;
    const state = {} as RouterStateSnapshot;

    const result = canActivate(route, state);

    expect(result).toBe(true);
  });
});
