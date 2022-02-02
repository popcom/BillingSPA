import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { CustomerListComponent } from './customer/customer-list/customer-list.component';
import { CustomerDetailsComponent } from './customer/customer-details/customer-details.component';
import { CustomerEditComponent } from './customer/customer-edit/customer-edit.component';
import { InvoiceListComponent } from './invoice/invoice-list/invoice-list.component';
import { InvoiceDetailsComponent } from './invoice/invoice-details/invoice-details.component';
import { InvoiceEditComponent } from './invoice/invoice-edit/invoice-edit.component';


const routes: Routes = [ 
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'customer', component: CustomerListComponent },
  { path: 'customer/:id', component: CustomerDetailsComponent },
  { path: 'customer/:id/edit',component: CustomerEditComponent },
  { path: 'invoice', component: InvoiceListComponent },
  { path: 'invoice/:id', component: InvoiceDetailsComponent },
  { path: 'invoice/:id/edit',component: InvoiceEditComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
