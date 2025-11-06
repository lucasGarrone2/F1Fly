import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/auth-service';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const auth= inject(AuthService);
  const router= inject(Router);
  if(auth.isLoggedin())
  {
    return true;
  }
  return router.createUrlTree(["/inicio_sesion"]);
};
