import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { FisioLayoutComponent } from './layouts/fisio-layout/fisio-layout.component';
import { HistoralComponent } from './pages/fisio/historal/historal.component';
import { InfoPrincipalComponent } from './pages/fisio/info-principal/info-principal.component';

export const routes: Routes = [
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [

      
    ]
  },
  {
    path: '',
    component: FisioLayoutComponent,
    children: [
      { path: '', redirectTo: 'historial', pathMatch: 'full' },
      { path: 'historial', component: HistoralComponent}
    ]
  },
  { path: '**', redirectTo: '' }
];
