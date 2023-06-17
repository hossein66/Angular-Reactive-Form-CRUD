import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCustomerComponent } from './components/add-customer/add-customer.component';
import { CustomersListComponent } from './components/customers-list/customers-list.component';
import { EditCustomersComponent } from './components/edit-customers/edit-customers.component';
const routes: Routes = [
  {
    path: '',
    component: CustomersListComponent
  },
  { path: 'add', component: AddCustomerComponent },
  { path: 'edit', component: EditCustomersComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule { }
