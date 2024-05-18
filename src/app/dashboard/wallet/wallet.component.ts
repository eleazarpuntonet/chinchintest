import { Component } from '@angular/core';
import { MarketCoins } from '../dashboard/data';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrl: './wallet.component.css'
})
export class WalletComponent {
  Mycoins: any[] = [];
  displayedColumns: string[] = ['image', 'name','amount', 'rate', 'price', 'market_cap'];
  dataSource = new MatTableDataSource(this.Mycoins);

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.Mycoins = this.authService.getWallet();
    console.log(this.Mycoins)
    this.dataSource.data = this.Mycoins;
  }
}
