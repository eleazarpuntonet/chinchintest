import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FullLayoutComponent } from '../shared/layouts/full/full-layout.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: FullLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: '/panel',
        pathMatch: 'full'
      },
      {
        path: 'panel',
        component: DashboardComponent
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
