import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CustomersListComponent } from './components/customers-list/customers-list.component';
import { CustomersRoutingModule } from './customers-routing.module';

@NgModule({
  declarations: [
    CustomersListComponent
  ],
  imports: [
    SharedModule,
    CustomersRoutingModule
  ]
})
export class CustomersModule { }
