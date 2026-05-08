import { Routes } from '@angular/router';
import {ReadingComponent} from './components/reading/reading.component';
import {ImportExportComponent} from './components/import-export/import-export.component';
import {CustomerComponent} from './components/customer/customer.component';

export const routes: Routes = [
  { path: '', redirectTo: 'customers', pathMatch: 'full' },
  { path: 'customers', component: CustomerComponent },
  { path: 'reading', component: ReadingComponent },
  { path: 'import-export', component: ImportExportComponent },
  { path: '**', redirectTo: 'customers' }
];
