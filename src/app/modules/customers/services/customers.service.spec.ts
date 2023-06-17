import { TestBed } from '@angular/core/testing';
import { CountryCode } from 'libphonenumber-js/types';

import { CustomersService } from './customers.service';

const mock = {
  validAccountNumber:'635802010014976',
  inValidAccountNumber:'BNZAA2318JM',
  validEmail:'navabi.hossein@gmail.com',
  inValidEmail:'navabi.hossein',
  countryCode:"IR",
  validPhoneNumber:'+989127381391',
  invalidPhoneNumber:'+989',
};
describe('CustomersService', () => {
  let service: CustomersService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#isValidAccountNumber should return true', () => {
    expect(service.isValidAccountNumber(mock.validAccountNumber)).toBe(true);
  });

  it('#isValidAccountNumber should return false', () => {
    expect(service.isValidAccountNumber(mock.inValidAccountNumber)).toBe(false);
  });

  it('#isValidEmail should return true', () => {
    expect(service.isValidEmail(mock.validEmail)).toBe(true);
  });

  it('#isValidEmail should return false', () => {
    expect(service.isValidEmail(mock.inValidEmail)).toBe(false);
  });

  it('#isValidPhoneNumber should return true', () => {
    expect(service.isValidPhoneNumber(mock.countryCode as CountryCode,mock.validPhoneNumber)).toBe(true);
  });

  it('#isValidPhoneNumber should return false', () => {
    expect(service.isValidPhoneNumber(mock.countryCode as CountryCode,mock.invalidPhoneNumber)).toBe(false);
  });
});
