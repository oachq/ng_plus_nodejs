import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';

import { AdminGuard } from '../guards/admin.guard';

import { UsuariosComponent } from './mantenimiento/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimiento/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimiento/medicos/medicos.component';
import { MedicoComponent } from './mantenimiento/medicos/medico/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';

const chilRoutes: Routes = [
  {path: '', component: DashboardComponent, data: {titulo: 'Dashboard'}},
  {path: 'account-settings', component:  AccountSettingsComponent, data: {titulo: 'Ajustes de cuenta'}},
  {path: 'buscar/:termino', component: BusquedaComponent, data: {titulo: 'Busquedas'}},
  {path: 'progress', component: ProgressComponent, data: {titulo: 'ProgressBar'}},
  {path: 'grafica1', component: Grafica1Component, data: {titulo: 'Grafica # 1'}},
  {path: 'promesas', component: PromesasComponent, data: {titulo: 'Promesas'}},
  {path: 'rxjs', component: RxjsComponent, data: {titulo: 'RxJs'}},
  {path: 'perfil', component: PerfilComponent, data: {titulo: 'Perfil de usuario'}},
  
 // mantenimiento  
 {path: 'hospital', component: HospitalesComponent, data: {titulo: 'Mantenimiento de Hospitales '}},
 {path: 'medico', component: MedicosComponent, data: {titulo: 'Mantenimiento de Medicos '}},
 {path: 'medico/:id', component: MedicoComponent, data: {titulo: 'Mantenimiento de Medicos '}},
 
 //Rutas de admin 
 {path: 'usuario', canActivate: [AdminGuard], component: UsuariosComponent, data: {titulo: 'Mantenimiento de Usuario '}},
]

@NgModule({
  imports: [ RouterModule.forChild(chilRoutes)],
  exports: [RouterModule ] 
})
export class ChildRoutesModule { }
