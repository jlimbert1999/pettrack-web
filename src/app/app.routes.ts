import { Routes } from '@angular/router';
import { isAuthenticatedGuard } from './presentation/guards';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./presentation/layouts/home/home.component'),
    loadChildren: () => [
      {
        path: 'dashboard',
        canActivate: [isAuthenticatedGuard],
        loadComponent: () =>
          import('./presentation/pages/dashboard/dashboard.component'),
      },
    ],
  },
  {
    path: 'auth',
    loadComponent: () => import('./presentation/layouts/login/login.component'),
  },
];
