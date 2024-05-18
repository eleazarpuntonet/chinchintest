import { USD_COIN } from './../dashboard/dashboard/data';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly storageKey = 'users';
  private currentUserKey = 'currentUser';

  constructor() { }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.currentUserKey);
  }

  register(email: string, password: string): boolean {
    const users = this.getUsers();
    if (users.find(user => user.email === email)) {
      return false; // User already exists
    }
    users.push({ email, password, wallet: [
      {...USD_COIN,amount: 1000}
    ], transactions: [] });
    localStorage.setItem(this.storageKey, JSON.stringify(users));
    return true;
  }

  login(email: string, password: string): boolean {
    const users = this.getUsers();
    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
      localStorage.setItem(this.currentUserKey, JSON.stringify(user));
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem(this.currentUserKey);
  }

  getCurrentUser(): any {
    return JSON.parse(localStorage.getItem(this.currentUserKey) || '{}');
  }

  private getUsers(): any[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  addCoinToWallet(coin: any) {
    const user = this.getCurrentUser();
    if (user) {
      user.wallet.push(coin);
      this.updateCurrentUser(user);
    }
  }

  getWallet() {
    const user = this.getCurrentUser();
    return user ? user.wallet : [];
  }

  exchangeCoins(fromCoin: string, toCoin: string, amount: number, receivedAmount: number): void {
    const user = this.getCurrentUser();
    if (user) {
      console.log(user)
      const fromCoinIndex = user.wallet.findIndex((coin: any) => coin.name === fromCoin);
      const toCoinIndex = user.wallet.findIndex((coin: any) => coin.name === toCoin);

      if (fromCoinIndex !== -1 && toCoinIndex !== -1) {
        user.wallet[fromCoinIndex].amount -= amount;
        user.wallet[toCoinIndex].amount += receivedAmount;
      } else if (fromCoinIndex !== -1) {
        user.wallet[fromCoinIndex].amount -= amount;
        user.wallet.push({ name: toCoin, amount: receivedAmount });
      } else {
        console.log(fromCoin,'is not in the wallet')
        // Handle the case where fromCoin is not in the wallet
      }

      console.log(user.wallet)

      this.updateCurrentUser(user);
    }
  }

  private updateCurrentUser(user: any) {
    const users = this.getUsers().map(u => u.email === user.email ? user : u);
    localStorage.setItem(this.storageKey, JSON.stringify(users));
    localStorage.setItem(this.currentUserKey, JSON.stringify(user));
  }

  getTransactions(): any[] {
    const user = this.getCurrentUser();
    return user ? user.transactions : [];
  }

}
