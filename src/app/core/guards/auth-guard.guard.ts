
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { inject } from '@angular/core';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const authService= inject(AuthService)
  const router = inject(Router)
  const expectedRole = route.data['expectedRole'];
  if(authService.hasPermission(expectedRole)){
    return true
  }else{
    router.navigate(['/login'])
    return false
  }
};
