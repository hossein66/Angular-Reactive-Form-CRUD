import { AbstractControl, ValidatorFn } from "@angular/forms";
import { CustomersService } from "../services/customers.service";

    export function AccountNumberValidator(customerService: CustomersService): ValidatorFn {
      return (control: AbstractControl ): { [key: string]: any  } | null  => {
        return !customerService.isValidAccountNumber(control.value) ? 
        { bankAccountNumberError : true } : null;
      };
    }
  