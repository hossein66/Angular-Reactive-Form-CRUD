import { Component, OnInit } from '@angular/core';
import {  FormBuilder,  FormGroup, Validators } from '@angular/forms';
import { CustomersService } from '../../services/customers.service';
import { AccountNumberValidator } from '../../validators/bank-account-number.validator';
import { PhoneNumberValidator } from '../../validators/phone-number.validator';
import { MessageService } from 'src/app/modules/shared/services/message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {
  registerForm: FormGroup;
  separateDialCode = true;
  constructor(private formBuilder: FormBuilder,private customerService:CustomersService
    ,private messageService:MessageService,private router: Router) { }

  ngOnInit(): void {
    this.reactiveForm();
  }

  reactiveForm() {
    this.registerForm = this.formBuilder.group({
      Firstname: ['', [Validators.required]],
      Lastname: ['', [Validators.required]],
      DateOfBirth: ['',[Validators.required]],
      PhoneNumber: ['', [Validators.required]],
      Email: ['',[Validators.required,Validators.email]],
      BankAccountNumber:['',[Validators.required,AccountNumberValidator(this.customerService)]]
    });
  }

  date(e:any) {
    this.registerForm.get('DateOfBirth')?.setValue(this.customerService.formatDate(e.target.value), {
      onlyself: true
    })
  }
  
  public errorHandling = (control: string, error: string) => {
    return this.registerForm.controls[control].hasError(error);
  }

  onSubmit() {
    if (this.registerForm.invalid) {
        return;
    }
   let result= this.customerService.addcustomer(this.registerForm.value);
   this.messageService.openSnackBar(result.message);
   if (result.isSuccess) {
    this.router.navigate(['customers']);
   }
}
}
