import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { FisioLayoutComponent } from './layouts/fisio-layout/fisio-layout.component';

export const routes: Routes = [
    {
        path:'admin',
        component:AdminLayoutComponent,
        children:[
            {

            }
        ]
    },
    {
        path:'',
        component:FisioLayoutComponent,
        children:[
            {

            }
        ]
    },
    {path:'**',redirectTo:''}
];
