import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { FisioLayoutComponent } from './layouts/fisio-layout/fisio-layout.component';
import { LoginComponent } from './pages/admin/login/login.component';
import { HomeComponent } from './pages/admin/home/home.component'; // ← Agregar el HomeComponent

export const routes: Routes = [
    {
        path: '',
        component: AdminLayoutComponent,
        children: [
            {
                path: '', 
                component: LoginComponent
            },
            {
                path: 'home', // ← Nueva ruta para el home/dashboard
                component: HomeComponent
            }
        ]
    },
    {
        path: 'admin',
        component: AdminLayoutComponent,
        children: [
            {
                path: '', 
                component: LoginComponent
            },
            {
                path: 'home', // ← También disponible en /admin/home
                component: HomeComponent
            }
        ]
    },
    {
        path: 'fisio',
        component: FisioLayoutComponent,
        children: [
            // Rutas del fisio
        ]
    },
    { path: '**', redirectTo: '' }
];