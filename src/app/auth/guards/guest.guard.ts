import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth.service';

export const guestGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.getCurrentUser().email) {
    router.navigate(['/dashboard/panel']);
    return false;
  } else {
    return true;
  }
};
