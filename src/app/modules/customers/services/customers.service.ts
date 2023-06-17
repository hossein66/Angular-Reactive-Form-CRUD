import { Injectable } from '@angular/core';
import { CountryCode, isValidPhoneNumber } from 'libphonenumber-js';
import { Customer } from '../models/customer';
import { IServiceResult } from '../../shared/models/service-result';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  customers: Customer[] ;
  constructor() { }

  getcustomers():Customer[] {
    if(localStorage.getItem('customers') === null) {
      this.customers = [];
    } else {
      this.customers = JSON.parse(localStorage.getItem('customers') || '{}');
    }
    return this.customers;
  }
  addcustomer(customer: Customer):IServiceResult<Customer> {
    try {
      if (!this.isValidEmail(customer.Email)) {
        throw new Error('This email address its not valid!');
      }
      this.getcustomers()
      if (!this.isUnique_firstName_lastName_dateOfBirth(customer.Firstname,customer.Lastname,customer.DateOfBirth,this.customers)) {
      throw new Error('This customer already exists!');
      }
      if (!this.isUniqueEmail(customer.Email,this.customers)) {
        throw new Error('This email address already exists!');
      }
      this.customers.push(customer);
      let customers = [];
      if(localStorage.getItem('customers') === null) {
        customers = [];
        customers.push(customer);
        localStorage.setItem('customers', JSON.stringify(customers));
      } else {
        customers = JSON.parse(localStorage.getItem('customers') || '{}');
        customers.push(customer); 
        localStorage.setItem('customers', JSON.stringify(customers));
      }
      return this.success('Customer added successfully.',customer)
    } catch (error:any) {
      return this.error(error.message,customer);
    }

  }
  deleteCustomer(customer: Customer) {
    try {
    this.getcustomers();
    for (let i = 0; i < this.customers.length; i++) {
      if (this.isCurentCustomer(customer,this.customers[i])) {
        this.customers.splice(i, 1);
        localStorage.setItem('customers', JSON.stringify(this.customers));
      }
    }
    return this.success('Customer deleted successfully.',customer)
  } catch (error:any) {
    return this.error(error.message,customer);
  }
  }
  updateCustomer(customer: Customer,oldCustomer:Customer) {
    try {
      if (!this.isValidEmail(customer.Email)) {
        throw new Error('This email address its not valid!');
      }
      if (!this.isCurentCustomer(customer,oldCustomer)){
          if (!this.isUnique_firstName_lastName_dateOfBirth(customer.Firstname,customer.Lastname,customer.DateOfBirth,this.customers)) {
          throw new Error('This customer already exists!');
          }
      }
      if (customer.Email!=oldCustomer.Email) {
        if (!this.isUniqueEmail(customer.Email,this.customers)) {
          throw new Error('This email address already exists!');
        }
      }
      this.getcustomers();
      for (let i = 0; i < this.customers.length; i++) {
        if (this.isCurentCustomer(oldCustomer,this.customers[i])) {
          this.customers[i].Firstname=customer.Firstname;
          this.customers[i].Lastname=customer.Lastname;
          this.customers[i].DateOfBirth=customer.DateOfBirth;
          this.customers[i].PhoneNumber=customer.PhoneNumber;
          this.customers[i].BankAccountNumber=customer.BankAccountNumber;
          this.customers[i].Email=customer.Email;
          localStorage.setItem('customers', JSON.stringify(this.customers));
        }
      }    
    return this.success('Customer edited successfully.',customer)
  } catch (error:any) {
    return this.error(error.message,customer);
  }

  }
  private success<T=any>(message:string, data:T):IServiceResult<T>{
    return <IServiceResult<T>>{isSuccess:true,data:data,message:message};
  }
  private error<T=any>(message:string, data:T):IServiceResult<T>{
    return <IServiceResult<T>>{isSuccess:false,data:data,message:message};
  }
  private isCurentCustomer(curentCustomer:Customer,inputCustomer:Customer)
  {
    return curentCustomer.Firstname == inputCustomer.Firstname &&
           curentCustomer.Lastname == inputCustomer.Lastname   &&
           curentCustomer.DateOfBirth == inputCustomer.DateOfBirth
  }
  private isUniqueEmail(emailAddress:string,customers: Customer[])
  {
    return !customers.find(c=> c.Email==emailAddress);
  }
  private isUnique_firstName_lastName_dateOfBirth(firstname:string,lastname:string,dateOfBirth:string,customers: Customer[])
  {
    return !customers.find(c=> c.Firstname==firstname && c.Lastname==lastname && c.DateOfBirth==dateOfBirth);
  }
  isValidEmail(email:string){ 
    let regex = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if (email == null) {
        return false;
    }
    if (regex.test(email) == true) {
        return true;
    }
    else {
        return false;
    }
  }
  isValidPhoneNumber(contry: CountryCode,phoneNumber:string){ 
    return isValidPhoneNumber(phoneNumber, contry);
}
  isValidAccountNumber(accountNumber:string){
    let regex = new RegExp(/^[0-9]{9,18}$/);
    if (accountNumber == null) {
        return false;
    }
    if (regex.test(accountNumber) == true) {
        return true;
    }
    else {
        return false;
    }
  }

  formatDate(date:string) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}
}
