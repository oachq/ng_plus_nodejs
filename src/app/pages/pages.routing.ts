import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

// componentes de pages con bloqueo
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';

import { AuthGuard } from '../guars/auth.guard';
import { UsuariosComponent } from './mantenimiento/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimiento/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimiento/medicos/medicos.component';
import { MedicoComponent } from './mantenimiento/medicos/medico/medico.component';

const routes: Routes = [ 
    {
        path: 'dashboard', component: PagesComponent,
        canActivate:[AuthGuard],
        children: [
          {path: '', component: DashboardComponent, data: {titulo: 'Dashboard'}},
          {path: 'progress', component: ProgressComponent, data: {titulo: 'ProgressBar'}},
          {path: 'grafica1', component: Grafica1Component, data: {titulo: 'Grafica # 1'}},
          {path: 'account-settings', component:  AccountSettingsComponent, data: {titulo: 'Ajustes de cuenta'}},
          {path: 'promesas', component: PromesasComponent, data: {titulo: 'Promesas'}},
          {path: 'rxjs', component: RxjsComponent, data: {titulo: 'RxJs'}},
          {path: 'perfil', component: PerfilComponent, data: {titulo: 'Perfil de usuario'}},
          
         // mantenimiento  
         {path: 'usuario', component: UsuariosComponent, data: {titulo: 'Mantenimiento de Usuario '}},
         {path: 'hospital', component: HospitalesComponent, data: {titulo: 'Mantenimiento de Hospitales '}},
         {path: 'medico', component: MedicosComponent, data: {titulo: 'Mantenimiento de Medicos '}},
         {path: 'medico/:id', component: MedicoComponent, data: {titulo: 'Mantenimiento de Medicos '}},
        ]
      },
];

@NgModule({
    imports: [ RouterModule.forChild(routes)],
    exports: [RouterModule ] 
})

export class PagesRoutingModule {}