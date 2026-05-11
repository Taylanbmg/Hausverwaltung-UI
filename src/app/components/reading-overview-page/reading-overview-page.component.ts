import { Component } from '@angular/core';
import {MatFabButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {Router} from '@angular/router';

@Component({
  selector: 'app-reading-overview-page',
  imports: [
    MatFabButton,
    MatIcon
  ],
  templateUrl: './reading-overview-page.component.html',
  standalone: true,
  styleUrl: './reading-overview-page.component.css'
})
export class ReadingOverviewPageComponent {

  constructor(private router: Router) {}

  goToSuche() {
    this.router.navigate(['/sucheReading']);
  }

  goToReadingErstellen() {
    this.router.navigate(['/erstellenReading'])
  }
}
