import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {map} from 'rxjs';
import { Reading, ReadingsWrapper } from '../models/reading.model';

@Injectable({
  providedIn: 'root'
})
export class ReadingService {

  private apiUrl = 'http://localhost:8080/test/ressources/readings';
  constructor(private http: HttpClient) {}

  createReading(reading: Reading) {
    return this.http.post<ReadingsWrapper>(this.apiUrl, {
      reading: reading
    }).pipe(map(res => res.readings));
  }

  getReadingById(id: string) {
    return this.http.get<ReadingsWrapper>(`${this.apiUrl}/${id}`).pipe(map(res => res.readings));
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
