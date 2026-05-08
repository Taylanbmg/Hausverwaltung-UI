export type Gender = 'D' | 'M' | 'U' | 'W';

export interface Customer {
  id?: string | null;
  uuid?: string | null;
  firstName: string;
  lastName: string;
  birthDate?: string | null;
  gender: Gender;
}

export interface CustomerWrapper {
  customer: Customer;
}

export interface CustomersWrapper {
  customers: Customer[];
}
