import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { FisiolayoutComponent } from './layouts/fisio-layout/fisio-layout.component';
import { Home } from './pages/fisio/home/home';

//Rutas Fisio
import { ListaPacientesComponent } from './pages/fisio/lista-pacientes/lista-pacientes.component';
import { AgendaFisioComponent } from './pages/fisio/agenda-fisio/agenda-fisio.component';
import { CitasComponent } from './pages/fisio/citas/citas.component';

export const routes: Routes = [
    {
        path: 'admin',
        component: AdminLayoutComponent,
        children: [
            // Rutas de admin
        ]
    },
    {
        path: 'fisio',
        component: FisiolayoutComponent,
        children: [
            { path: 'home', component: Home },
            { path: 'pacientes', component: ListaPacientesComponent},
            {path: 'agenda', component: AgendaFisioComponent},
            {path: 'citas', component: CitasComponent}
        ]
    },

    { 
        path: '', 
        redirectTo: 'fisio/home', 
        pathMatch: 'full' 
    },
    { 
        path: '**', 
        redirectTo: 'fisio/home' 
    }
];