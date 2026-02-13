import {Gender} from '../enums/Gender';

export interface Customer {
 uuid: string;
 firstName: string;
 lastName: string;
 gender: Gender;
 birthDate: string;
}
