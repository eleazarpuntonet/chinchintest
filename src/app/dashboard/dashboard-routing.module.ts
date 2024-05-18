import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FullLayoutComponent } from '../shared/layouts/full/full-layout.component';
import { WalletComponent } from './wallet/wallet.component';
import { ExchangeComponent } from './exchange/exchange.component';
import { TransactionsComponent } from './transactions/transactions.component';

const routes: Routes = [
  {
    path: '',
    component: FullLayoutComponent,
    children: [
      {
        path: 'panel',
        component: DashboardComponent
      },
      {
        path: 'wallet',
        component: WalletComponent
      },
      {
        path: 'exchange',
        component: ExchangeComponent
      },
      {
        path: 'transactions',
        component: TransactionsComponent
      },
      { path: '',   redirectTo: 'panel', pathMatch: 'full' },
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
