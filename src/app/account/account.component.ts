import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validator, Validators,ReactiveFormsModule } from "@angular/forms";
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-customer',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  public accountForm: FormGroup;

  filterText = '';

  customer = undefined;
  allCustomers = [];

  customerId  = '';

  constructor(
    private customerService: AccountService,
    private router: Router,
    private route: ActivatedRoute,
    formBuilder: FormBuilder) {
    this.route.params.subscribe( params => {
      this.customerId = params.customerId;
    });

      this.accountForm = formBuilder.group({
        accountName: new FormControl('New Account'),
        initialDeposit: new FormControl('0'),    
      });
  }

  submitAccount() {
    var accountName = this.accountForm.get('accountName').value;
    var initialDeposit = this.accountForm.get('initialDeposit').value
    var account = {customerId: this.customerId, name: accountName, initialCredit: Number(initialDeposit) }

    this.customerService.add(account).subscribe(
      () => {
        window.location.reload();
      },
      (error) => {
        console.error(error);
      });
  }

  ngOnInit() {
    this.customerService.getAccount(this.customerId).subscribe((data: any) => {
      this.customer = data;

      this.allCustomers = this.customer.accounts;
      this.allCustomers.filter(account => account.name == null).forEach(account => account.name = 'Unnamed Account');

      console.log(this.allCustomers);
      this.allCustomers = this.allCustomers.sort((p1, p2) => (p2.favorite ?? false) - p1.favorite);
      this.allCustomers.forEach(customer => customer.visible = true);
    });
  }

  onFilterTextChange(val: string) {
    this.allCustomers.forEach(account => account.visible = false);
    this.allCustomers.filter(account => account.name.toLowerCase().includes(val.toLowerCase())).forEach(account => account.visible = true);
  }

  onClickCustomer(customer: any) {
    this.router.navigate(['customer/' + customer.id + '/accounts']);
  }
}
