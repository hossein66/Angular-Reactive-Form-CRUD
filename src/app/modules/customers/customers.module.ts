import { NgModule } from '@angular/core';
import { NgxMatIntlTelInputModule } from 'ngx-mat-intl-tel-input-angular-13';
import { SharedModule } from '../shared/shared.module';
import { AddCustomerComponent } from './components/add-customer/add-customer.component';
import { CustomersListComponent } from './components/customers-list/customers-list.component';
import { DeleteCustomersComponent } from './components/delete-customers/delete-customers.component';
import { EditCustomersComponent } from './components/edit-customers/edit-customers.component';
import { CustomersRoutingModule } from './customers-routing.module';

@NgModule({
  declarations: [
    CustomersListComponent,
    AddCustomerComponent,
    EditCustomersComponent,
    DeleteCustomersComponent
  ],
  imports: [
    SharedModule,
    CustomersRoutingModule,
    NgxMatIntlTelInputModule,
  ]
})
export class CustomersModule { }
