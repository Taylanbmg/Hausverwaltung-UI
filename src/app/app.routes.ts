import { Routes } from '@angular/router';
import {CustomerSucheComponent} from './components/customer-suche/customer-suche.component';
import {CustomerOverviewPageComponent} from './components/customer-overview-page/customer-overview-page.component';

export const routes: Routes = [
  { path: '', component: CustomerOverviewPageComponent },
  { path: '/suche', component: CustomerSucheComponent }
];
