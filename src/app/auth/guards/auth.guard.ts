import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  console.log('Estoy logueado')
  if (authService.getCurrentUser().email) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
