import { Routes } from '@angular/router';
import {CustomerSucheComponent} from './components/customer-suche/customer-suche.component';
import {CustomerOverviewPageComponent} from './components/customer-overview-page/customer-overview-page.component';
import {CustomerErstellenComponent} from './components/customer-erstellen/customer-erstellen.component';

export const routes: Routes = [
  { path: '', component: CustomerOverviewPageComponent, pathMatch: "full" },
  { path: 'suche', component: CustomerSucheComponent },
  { path: 'erstellen', component: CustomerErstellenComponent}
];
