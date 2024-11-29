import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { tap } from 'rxjs';
import { OwnerService } from '../services';

export const isAuthenticatedGuard: CanActivateFn = () => {
  const authService = inject(OwnerService);
  const router = inject(Router);
  return authService.checkAuthStatus().pipe(
    tap((isAuthenticated) => {
      if (!isAuthenticated) router.navigateByUrl('/auth');
    })
  );
};
