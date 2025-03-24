import { Routes } from '@angular/router';
import {
  isAuthenticatedGuard,
  isNotAuthenticatedGuard,
} from './presentation/guards';

export const routes: Routes = [
  {
    title: 'Verificar',
    path: 'verify/:id',
    loadComponent: () => import('./presentation/pages/verify/verify.component'),
  },
  {
    title: 'Verificar',
    path: 'no-found',
    loadComponent: () => import('./presentation/pages/not-pet-found/not-pet-found.component'),
  },
  {
    title: 'Inicio de sesion',
    path: 'auth',
    canActivate: [isNotAuthenticatedGuard],
    loadComponent: () => import('./presentation/layouts/login/login.component'),
  },
  {
    path: '',
    loadComponent: () => import('./presentation/layouts/home/home.component'),
    loadChildren: () => [
      {
        title: 'Inicio',
        path: 'home',
        loadComponent: () =>
          import('./presentation/pages/landing/landing.component'),
      },
      {
        title: 'Mis Mascotas',
        path: 'pets',
        children: [
          {
            path: '',
            canActivate: [isAuthenticatedGuard],
            loadComponent: () =>
              import('./presentation/pages/dashboard/dashboard.component'),
          },
        ],
      },
      { path: '', pathMatch: 'full', redirectTo: '/home' },
    ],
  },
  { path: '**', redirectTo: '/home' },
];
