import {Gender} from '../enums/Gender';

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  gender: Gender;
  birthDate: string;
}
