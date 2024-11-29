import { Routes } from '@angular/router';
import { isAuthenticatedGuard } from './presentation/guards';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./presentation/layouts/home/home.component'),
    loadChildren: () => [
      { path: '', pathMatch: 'full', redirectTo: 'pets' },
      {
        path: 'pets',
        children: [
          {
            path: '',
            canActivate: [isAuthenticatedGuard],
            loadComponent: () =>
              import('./presentation/pages/dashboard/dashboard.component'),
          },
          {
            path: ':id',
            canActivate: [isAuthenticatedGuard],
            loadComponent: () =>
              import('./presentation/pages/detail/detail.component'),
          },
        ],
      },
    ],
  },
  {
    path: 'auth',
    loadComponent: () => import('./presentation/layouts/login/login.component'),
  },
];
