import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { CriptoserviceService } from '../../services/criptoservice.service';
import { BS_COIN, MarketCoins, PTR_COIN, USD_COIN } from '../dashboard/data';

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.css']
})
export class ExchangeComponent implements OnInit {
  exchangeForm: FormGroup;
  coins: any[] = [];
  exchangeRate: number | null = null;
  userWallet: any[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private cryptoService: CriptoserviceService
  ) {
    this.exchangeForm = this.fb.group({
      fromCoin: ['', Validators.required],
      toCoin: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.loadCoins();
    this.loadUserWallet();
  }

  loadCoins(): void {
    // this.cryptoService.getAvailableCoins().subscribe(coins => {
    //   this.coins = coins;
    // });
    this.coins = [...MarketCoins,BS_COIN,PTR_COIN]
  }

  loadUserWallet(): void {
    this.userWallet = this.authService.getWallet();
  }

  getExchangeRate(): void {
    const { fromCoin, toCoin } = this.exchangeForm.value;
    if (fromCoin && toCoin) {
      this.cryptoService.getExchangeRate(fromCoin, toCoin).subscribe(rate => {
        this.exchangeRate = rate;
      });
    }
  }

  onAmountChange(): void {
    this.getExchangeRate();
  }

  performExchange(): void {
    const { fromCoin, toCoin, amount } = this.exchangeForm.value;
    if (this.exchangeRate && amount > 0) {
      this.cryptoService.exchange(fromCoin,toCoin,amount,this.exchangeRate)
      this.loadUserWallet();
      this.exchangeRate = null
      this.exchangeForm.reset();
    }
  }



  performBuy(): void {
    // Lógica para realizar la compra
  }

  performSell(): void {
    // Lógica para realizar la venta
  }
}
