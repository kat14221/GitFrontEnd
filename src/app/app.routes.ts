import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { MedicoComponent } from './component/medico/medico.component'; 
import { EspecialidadComponent } from './component/especialidad/especialidad.component'; 

import { AuthGuard } from './auth/services/auth.guard'; 
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Home'
    },
    {
        path: 'medico',
        component: MedicoComponent,
        title: 'Medico',
        canActivate: [AuthGuard] 
    },
    {
        path: 'especialidad',
        component: EspecialidadComponent,
        title: 'Especialidad',
        canActivate: [AuthGuard] 
    },
    {
        path: 'login',
        component: LoginComponent,
        title: 'Login'
     
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full',
    }
];
