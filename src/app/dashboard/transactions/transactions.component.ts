import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css'
})
export class TransactionsComponent {
  transactions: any[] = [];
  displayedColumns: string[] = ['fromCoin', 'toCoin' , 'recibido' , 'amount', 'rate', 'date'];
  dataSource = new MatTableDataSource(this.transactions);

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.transactions = this.authService.getTransactions();
    this.dataSource.data = this.transactions;
  }
}
