import {Routes} from '@angular/router';
import {CustomerSucheComponent} from './components/customer-suche/customer-suche.component';
import {CustomerOverviewPageComponent} from './components/customer-overview-page/customer-overview-page.component';
import {CustomerErstellenComponent} from './components/customer-erstellen/customer-erstellen.component';
import {CustomerUpdateComponent} from './components/customer-update/customer-update.component';
import {CustomerDeleteComponent} from './components/customer-delete/customer-delete.component';
import {ReadingComponent} from './components/reading/reading.component';
import {ImportExportComponent} from './components/import-export/import-export.component';
import {CustomerComponent} from './components/customer/customer.component';

export const routes: Routes = [
  { path: 'overview', component: CustomerOverviewPageComponent},
  { path: 'suche', component: CustomerSucheComponent},
  { path: 'erstellen', component: CustomerErstellenComponent},
  { path: 'update', component: CustomerUpdateComponent },
  { path: 'löschen', component: CustomerDeleteComponent },
  { path: '', redirectTo: 'customers', pathMatch: 'full' },
  { path: 'customers', component: CustomerComponent },
  { path: 'reading', component: ReadingComponent },
  { path: 'import-export', component: ImportExportComponent },
  { path: '**', redirectTo: 'customers' }
];
