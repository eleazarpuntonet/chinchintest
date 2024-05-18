import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExchangeComponent } from './exchange/exchange.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { SettingsComponent } from './settings/settings.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FullLayoutComponent } from '../shared/layouts/full/full-layout.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { WalletComponent } from './wallet/wallet.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from '../shared/header/header.component';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';



@NgModule({
  declarations: [
    DashboardComponent,
    ExchangeComponent,
    TransactionsComponent,
    SettingsComponent,
    FullLayoutComponent,
    WalletComponent,
    HeaderComponent,
    SidebarComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    MaterialModule,
    DashboardRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ]
})
export class DashboardModule { }

