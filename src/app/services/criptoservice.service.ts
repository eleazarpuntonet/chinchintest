import { Injectable } from '@angular/core';
import { Coin } from './interfaces';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, interval, map, of, switchMap } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { BS_COIN, PTR_COIN, USD_COIN } from '../dashboard/dashboard/data';
import { CurrencyPipe } from '@angular/common';

@Injectable({
  providedIn: 'any',
})
export class CriptoserviceService {
  private readonly baseUrl = 'https://api.coingecko.com/api/v3';
  private readonly apiKey = 'CG-bBYgNHd4QVDqtKjnzg36D7mG';

  constructor(
    private authService: AuthService,
    private http: HttpClient
  ) {}

  getCoins(): Observable<Coin[]> {
    const headers = { 'x-cg-api-key': this.apiKey };
    return this.http.get<Coin[]>(`${this.baseUrl}/coins/markets?vs_currency=usd`, { headers });
  }

  getCoinsIntervals(): Observable<Coin[]> {
    const headers = new HttpHeaders().set('x-cg-api-key', this.apiKey);
    return interval(30000).pipe(
      switchMap(() => this.http.get<Coin[]>(`${this.baseUrl}/coins/markets?vs_currency=usd`, { headers }))
    );
  }

  exchange(fromCoin: Coin, toCoin: Coin, amount: number, rate: number): boolean {
    const user = this.authService.getCurrentUser();
    const fromWallet = user.wallet.find((coin: Coin) => coin.symbol === fromCoin.symbol);
    const toWallet = user.wallet.find((coin: Coin) => coin.symbol === toCoin.symbol);

    if (!fromWallet || fromWallet.amount < amount) {
      return false;
    }

    fromWallet.amount -= amount;
    if (toWallet) {
      toWallet.amount += amount * rate;
    } else {
      user.wallet.push({ ...toCoin, amount: amount * rate,rate });
    }

    user.transactions.push({
      fromCoin,
      toCoin,
      amount,
      rate,
      date: new Date()
    });

    localStorage.setItem('currentUser', JSON.stringify(user));
    this.updateUserInStorage(user);
    return true;
  }

  private updateUserInStorage(user: any): void {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const index = users.findIndex((u: any) => u.email === user.email);
    if (index !== -1) {
      users[index] = user;
      localStorage.setItem('users', JSON.stringify(users));
    }
  }


  getAvailableCoins(): Observable<any[]> {
    return this.getCoins().pipe(
      map(coins => {
        coins.push(USD_COIN);
        coins.push(BS_COIN);
        coins.push(PTR_COIN);
        return coins;
      })
    );
  }

  getExchangeRate(fromCoin: Coin, toCoin: Coin): Observable<number> {
    return of(fromCoin.current_price / toCoin.current_price); // Ejemplo de tasa de cambio
  }
}
