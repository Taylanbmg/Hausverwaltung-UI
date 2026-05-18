import {Routes} from '@angular/router';
import {CustomerSucheComponent} from './components/customer-suche/customer-suche.component';
import {CustomerOverviewPageComponent} from './components/customer-overview-page/customer-overview-page.component';
import {CustomerErstellenComponent} from './components/customer-erstellen/customer-erstellen.component';
import {CustomerUpdateComponent} from './components/customer-update/customer-update.component';
import {CustomerDeleteComponent} from './components/customer-delete/customer-delete.component';
import {ReadingComponent} from './components/reading/reading.component';
import {ImportExportComponent} from './components/import-export/import-export.component';
import {CustomerComponent} from './components/customer/customer.component';
import {ReadingOverviewPageComponent} from './components/reading-overview-page/reading-overview-page.component';
import {StatisticsComponent} from './components/statistics/statistics.component';
import {HomeComponent} from './home/home.component';

export const routes: Routes = [
  { path: 'overview', component: CustomerOverviewPageComponent},
  { path: 'suche', component: CustomerSucheComponent},
  { path: 'erstellen', component: CustomerErstellenComponent},
  { path: 'update', component: CustomerUpdateComponent },
  { path: 'löschen', component: CustomerDeleteComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'reading', component: ReadingComponent },
  { path: 'overviewReading', component: ReadingOverviewPageComponent},
  { path: 'erstellenReading', component: ReadingComponent},
  { path: 'import-export', component: ImportExportComponent },
  { path: 'statistics', component: StatisticsComponent },
  { path: '**', redirectTo: 'customers' }
];
