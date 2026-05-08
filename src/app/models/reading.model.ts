import {Customer} from './customer.model';

export type KindOfMeter = 'HEIZUNG' | 'STROM' | 'WASSER' | 'UNBEKANNT';

export interface Reading {
  id?: string | null;
  uuid?: string | null;
  customer: Customer | null;
  dateOfReading: string;
  comment?: string | null;
  meterId: string;
  substitute: boolean;
  meterCount: number;
  kindOfMeter: KindOfMeter;
}

export interface ReadingWrapper {
  reading: Reading;
}

export interface ReadingsWrapper {
  readings: Reading[];
}
