import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = 'http://localhost:5001/';

  constructor(private http: HttpClient) { }

  getAccounts() {
    return this.http.get(this.baseUrl + 'Account');
  }

  getAccount(customerId: string) {
    return this.http.get(this.baseUrl + 'Account/' + customerId);
  }
  
  add(account: any) {
    console.log(account);
    return this.http.post(this.baseUrl + 'Account', account);
  }
}
