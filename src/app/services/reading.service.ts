import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, pipe} from 'rxjs';


export interface Reading {
  id: string;
  customer: string;
  dateOfReading: string;
  kindOfMeter: 'HEIZUNG' | 'STROM' | 'UNBEKANNT' | 'WASSER';
  meterCount: number;
  meterId: string;
  comment: string;
  substitute: boolean;

}

export interface ReadingWrapper {
  reading: Reading;
}
export interface ReadingsWrapper {
  readings: Reading[];
}

@Injectable({
  providedIn: 'root'
})
export class ReadingService {

  private apiUrl = 'http://localhost:8080/api/readings';
  constructor(private http: HttpClient) {}

  create(reading: Reading) {
    return this.http.post<ReadingWrapper>(this.apiUrl, {
      reading: reading
    }).pipe(map(res => res.reading));
  }

  getById(id: string) {
    return this.http.get<ReadingWrapper>(`${this.apiUrl}/${id}`).pipe(map(res => res.reading));
  }

}
