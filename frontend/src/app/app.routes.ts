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
import { HomeFisioComponent } from './pages/admin/home-fisio/home-fisio.component';
import { CreateAcountComponent } from './pages/admin/create-acount/create-acount.component';
import { LoginComponent } from './pages/admin/login/login.component';
import { DashboardFisioComponent } from './pages/fisio/dashboard-fisio/dashboard-fisio.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'create-account', component: CreateAcountComponent},
  {
    path: 'admin',
    canActivate: [authGuard],
    component: AdminLayoutComponent,
    children: [
      { path: 'homeAdmin',component: HomeFisioComponent },
    ]
  },
  {
    path: 'fisio',
    canActivate: [authGuard],
    component: FisiolayoutComponent,
    children: [
      { path: 'home', component: Home },
      { path: 'pacientes', component: ListaPacientesComponent },
      { path: 'dashboard', component: DashboardFisioComponent }, // ← AGREGAR ESTA LÍNEA
      { path: 'agenda', component: AgendaFisioComponent },
      { path: 'citas', component: CitasComponent },
      { path: 'historial/:id', component: HistoralComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  // ruta comodín
  { path: '**', redirectTo: '' }
];
