import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../_services/customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  filterText = '';

  allCustomers = [];

  constructor(private customerService: CustomerService, private router: Router) { }

  ngOnInit() {
    this.customerService.getCustomers().subscribe((data: any) => {
      this.allCustomers = data;
      this.allCustomers = this.allCustomers.sort((p1, p2) => (p2.favorite ?? false) - p1.favorite);
      this.allCustomers.forEach(customer => customer.visible = true);
    });
  }

  onFilterTextChange(val: string) {
    this.allCustomers.forEach(customer => customer.visible = false);
    this.allCustomers.filter(customer => 
      customer.surname.toLowerCase().includes(val.toLowerCase()) || customer.name.toLowerCase().includes(val.toLowerCase())).forEach(customer => customer.visible = true);
  }

  onClickCustomer(customer: any) {
    this.router.navigate(['customer/' + customer.id + '/accounts']);
  }
}
