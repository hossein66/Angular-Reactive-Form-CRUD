import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomersService } from '../../services/customers.service';
import { Customer } from '../../models/customer';
import { AccountNumberValidator } from '../../validators/bank-account-number.validator';
import { PhoneNumberValidator } from '../../validators/phone-number.validator';
import { MessageService } from 'src/app/modules/shared/services/message.service';

@Component({
  selector: 'app-delete-customers',
  templateUrl: './delete-customers.component.html',
  styleUrls: ['./delete-customers.component.css']
})
export class DeleteCustomersComponent implements OnInit {
  customer: Customer;

  constructor(private router:Router, private activatedRoute:ActivatedRoute
    ,private formBuilder: FormBuilder,private customerService:CustomersService
    ,private messageService:MessageService) {    
    this.customer=this.router.getCurrentNavigation()?.extras.state as Customer;
}
deleteForm: FormGroup;
separateDialCode = true;

ngOnInit(): void {
  this.reactiveForm();
  this.deleteForm.patchValue(this.customer);
  this.deleteForm.disable();
}
reactiveForm() {
  this.deleteForm = this.formBuilder.group({
    Firstname: ['', [Validators.required]],
    Lastname: ['', [Validators.required]],
    DateOfBirth: ['',[Validators.required]],
    PhoneNumber: ['', [Validators.required,PhoneNumberValidator]],
    Email: ['',[Validators.required,Validators.email]],
    BankAccountNumber:['',[Validators.required,AccountNumberValidator(this.customerService)]]
  });
}

onSubmit() {
  if (this.deleteForm.invalid) {
      return;
  }
  let result=this.customerService.deleteCustomer(this.deleteForm.value);
  this.messageService.openSnackBar(result.message);
  if (result.isSuccess) {
   this.router.navigate(['customers']);
  }
}
}
