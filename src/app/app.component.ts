import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {MatCheckbox} from '@angular/material/checkbox';
import {ReadingService} from './services/reading.service';
import {JsonPipe} from '@angular/common';
import {MatSidenav, MatSidenavContainer} from '@angular/material/sidenav';
import {MatToolbar} from '@angular/material/toolbar';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatToolbar, MatIcon, MatButton, MatIconModule, RouterLink],
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
