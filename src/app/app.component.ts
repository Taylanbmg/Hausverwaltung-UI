import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatCheckbox} from '@angular/material/checkbox';
import {ReadingService} from './services/reading.service';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [ JsonPipe],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  readings: any[] = [];
  reading: any;

  constructor(private readingService: ReadingService) {}

  testGetAll() {
    this.readingService.getReadings().subscribe(data => {
      console.log(data);
      this.readings = data;
    });
  }

  testGetById() {
    const testId = 'f0052386-af25-40d0-8f9f-6f77eebdaed0';

    this.readingService.getReadingById(testId).subscribe(data => {
      console.log(data);
      this.reading = data;
    });
  }
}
