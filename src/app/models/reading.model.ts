export type KindOfMeter = 'STROM' | 'WASSER' | 'HEIZUNG' | 'UNBEKANNT';

export interface Reading {
  id: string;
  dateOfReading: string;
  meterCount: number;
  kindOfMeter: KindOfMeter;   // <-- eigener Typ, kein string
  comment: string;
  substitute: boolean;
  customer: {
    id: string;
    firstName: string;
    lastName: string;
  };
}

export interface ReadingsWrapper {
  readings: Reading[];
}
