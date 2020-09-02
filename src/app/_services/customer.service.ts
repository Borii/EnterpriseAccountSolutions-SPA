import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  baseUrl = 'http://localhost:5000/';

  constructor(private http: HttpClient) { }

  getCustomers() {
    return this.http.get(this.baseUrl + 'Customer');
  }

  getCustomer(customerId: string) {
    return this.http.get(this.baseUrl + 'Customer/' + customerId);
  }
}
