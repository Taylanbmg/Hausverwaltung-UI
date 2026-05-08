import {Component} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {ReadingService} from './services/reading.service';
import {MatToolbar} from '@angular/material/toolbar';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatToolbar, MatIcon, MatButton, MatIconModule],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  readings: any[] = [];
  reading: any;

  constructor(private readingService: ReadingService, private router: Router) {}

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

  goToCustomerOverview() {
    this.router.navigate(['/overview'])
  }
}
