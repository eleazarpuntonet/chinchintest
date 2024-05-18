import { Component, ViewChild } from '@angular/core';
import { Coin } from '../../services/interfaces';
import { CriptoserviceService } from '../../services/criptoservice.service';
import { MarketCoins } from './data';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  coins: any[] = MarketCoins;
  @ViewChild(MatSort) sort: MatSort | null = null;
  dataSource = new MatTableDataSource(this.coins);

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  constructor(private criptoService: CriptoserviceService) {}

  ngOnInit(): void {
    // this.criptoService.getCoins().subscribe(coins => {
    //   this.coins = coins;
    // });
  }


  displayedColumns: string[] = ['image','name', 'price', 'market_cap'];
}
