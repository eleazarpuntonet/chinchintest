import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { CriptoserviceService } from '../../services/criptoservice.service';
import { BS_COIN, MarketCoins, PTR_COIN, USD_COIN } from '../dashboard/data';
import {MatSnackBar} from '@angular/material/snack-bar';

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
  selectedFromCoin: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private cryptoService: CriptoserviceService,
    private snackBar: MatSnackBar
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
    this.coins = [...MarketCoins, BS_COIN, PTR_COIN];
  }

  loadUserWallet(): void {
    this.userWallet = this.authService.getWallet();
  }

  onFromCoinChange(): void {
    const fromCoin = this.exchangeForm.value.fromCoin;
    this.selectedFromCoin = fromCoin;
    this.getExchangeRate();
  }

  getExchangeRate(): void {
    const { fromCoin, toCoin } = this.exchangeForm.value;
    if (fromCoin && toCoin) {
      const fromCoinPriceInUSD = fromCoin.current_price;
      const toCoinPriceInUSD = toCoin.current_price;
      this.exchangeRate = fromCoinPriceInUSD / toCoinPriceInUSD;
    }
  }

  onAmountChange(): void {
    this.getExchangeRate();
  }

  performExchange(): void {
    const { fromCoin, toCoin, amount } = this.exchangeForm.value;
    if (this.exchangeRate && amount > 0) {
      const receivedAmount = amount * this.exchangeRate;
      let success = this.cryptoService.exchange(fromCoin,toCoin,amount,receivedAmount)
      if(success){
        this.snackBar.open('La transaccion fue llevada a cabo con exito!');
      } else {
        this.snackBar.open('La transaccion fallo!');
      }
      this.loadUserWallet();
      this.exchangeRate = null;
      this.exchangeForm.reset();
    }
  }
}
