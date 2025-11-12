import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { FisiolayoutComponent } from './layouts/fisio-layout/fisio-layout.component';
import { Home } from './pages/fisio/home/home';

// Rutas Fisio (de tu compañera)
import { ListaPacientesComponent } from './pages/fisio/lista-pacientes/lista-pacientes.component';
import { AgendaFisioComponent } from './pages/fisio/agenda-fisio/agenda-fisio.component';
import { CitasComponent } from './pages/fisio/citas/citas.component';

// Rutas Fisio (tuyas)
import { HistoralComponent } from './pages/fisio/historal/historal.component';
import { InfoPrincipalComponent } from './pages/fisio/info-principal/info-principal.component';

export const routes: Routes = [
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      // Rutas admin (puedes agregar más aquí)
    ]
  },
  {
    path: 'fisio',
    component: FisiolayoutComponent,
    children: [
      { path: 'home', component: Home },
      { path: 'pacientes', component: ListaPacientesComponent },
      { path: 'agenda', component: AgendaFisioComponent },
      { path: 'citas', component: CitasComponent },
      { path: 'historial', component: HistoralComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  },
  { path: '', redirectTo: 'fisio/home', pathMatch: 'full' },
  { path: '**', redirectTo: 'fisio/home' }
];
