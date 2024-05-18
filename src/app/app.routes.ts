import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { FullLayoutComponent } from './shared/layouts/full/full-layout.component';
import { authGuard } from './auth/guards/auth.guard';
import { guestGuard } from './auth/guards/guest.guard';


export const routes: Routes = [
  { path: '', redirectTo: '/dashboard/panel', pathMatch: 'full' },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadChildren: () => import('../app/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [guestGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [guestGuard],
  },
  { path: '**', redirectTo: '/dashboard/panel' }
];
