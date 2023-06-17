import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomersService } from '../../services/customers.service';
import { Customer } from '../../models/customer';
import { AccountNumberValidator } from '../../validators/bank-account-number.validator';
import { PhoneNumberValidator } from '../../validators/phone-number.validator';
import { MessageService } from 'src/app/modules/shared/services/message.service';

@Component({
  selector: 'app-edit-customers',
  templateUrl: './edit-customers.component.html',
  styleUrls: ['./edit-customers.component.css']
})
export class EditCustomersComponent implements OnInit {
  customer: Customer;

  constructor(private router:Router, private activatedRoute:ActivatedRoute,private formBuilder: FormBuilder
    ,private customerService:CustomersService,private messageService:MessageService) {  
     this.customer=this.router.getCurrentNavigation()?.extras.state as Customer;
}
editForm: FormGroup;
separateDialCode = true;

ngOnInit(): void {
  this.reactiveForm();
  this.editForm.patchValue(this.customer);
}
reactiveForm() {
  this.editForm = this.formBuilder.group({
    Firstname: ['', [Validators.required]],
    Lastname: ['', [Validators.required]],
    DateOfBirth: ['',[Validators.required]],
    PhoneNumber: ['', [Validators.required,PhoneNumberValidator]],
    Email: ['',[Validators.required,Validators.email]],
    BankAccountNumber:['',[Validators.required,AccountNumberValidator(this.customerService)]]
  });
}

date(e:any) {
  this.editForm.get('DateOfBirth')?.setValue(this.customerService.formatDate(e.target.value), {
    onlyself: true
  })
}

public errorHandling = (control: string, error: string) => {
  return this.editForm.controls[control].hasError(error);
}

onSubmit() {
  if (this.editForm.invalid) {
      return;
  }
  let result=this.customerService.updateCustomer(this.editForm.value,this.customer);
  this.messageService.openSnackBar(result.message);
  if (result.isSuccess) {
   this.router.navigate(['customers']);
  }
}

}
