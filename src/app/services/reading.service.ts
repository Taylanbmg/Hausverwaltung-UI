import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
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

  private apiUrl = 'http://localhost:8080/test/ressources/readings';
  constructor(private http: HttpClient) {}

  createReading(reading: Reading) {
    return this.http.post<ReadingWrapper>(this.apiUrl, {
      reading: reading
    }).pipe(map(res => res.reading));
  }

  getReadingById(id: string) {
    return this.http.get<ReadingWrapper>(`${this.apiUrl}/${id}`).pipe(map(res => res.reading));
  }

  updateReading(reading: Reading) {
    return this.http.put<{message: string}>(this.apiUrl, {reading: reading
    });
  }

  deleteReading(id: string) {
    return this.http.delete<{message: string}>(`${this.apiUrl}/${id}`);
  }

  getReadings(
    customer?: string,
    start?: string,
    end?: string,
    kindOfMeter?: string
  ) {

    let params = new HttpParams();

    if (customer) params = params.set('customer', customer);
    if (start) params = params.set('start', start);
    if (end) params = params.set('end', end);
    if (kindOfMeter) params = params.set('kindOfMeter', kindOfMeter);

    return this.http.get<ReadingsWrapper>(this.apiUrl, { params })
      .pipe(map(res => res.readings));
  }
}
