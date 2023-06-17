import { AbstractControl, ValidatorFn } from "@angular/forms";
import { CustomersService } from "../services/customers.service";

    export function PhoneNumberValidator(customerService: CustomersService): ValidatorFn {
      return (control: AbstractControl ): { [key: string]: any  } | null  => {
        console.log(control)
        return !customerService.isValidPhoneNumber(control.value.countryCode,control.value.number) ? 
        { phoneNumberError : true } : null;
      };
    }
  