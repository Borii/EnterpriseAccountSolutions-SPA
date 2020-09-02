import { Routes } from '@angular/router';
import { CustomerComponent } from './customer/customer.component';
import { AccountComponent } from './account/account.component';

export const appRoutes: Routes = [
    { path: '', component: CustomerComponent },
    {
        path: 'customers',
        component: CustomerComponent
    },
    {
        path: 'customer/:customerId/accounts',
        component: AccountComponent
    },
    { path: '**', redirectTo: '', pathMatch: 'full' }
]