import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatCheckbox} from '@angular/material/checkbox';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatCheckbox],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Hausverwaltung-ui';
}
