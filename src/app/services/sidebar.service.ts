import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any [ ] = [
    {
      titulo:'Dashboard',
      icono: 'mdi mdi-gauge',
      submenu: [
        {titulo: 'Main', url: '/'},
        {titulo: 'progressBar', url:'progress'},
        {titulo: 'Gráfica', url:'grafica1'},
        {titulo: 'Promesas', url:'promesas'},
        {titulo: 'rxjs', url:'rxjs'},
        
      ]
    },
    {
      titulo:'Mantenimiento',
      icono: 'mdi mdi-folder-lock-open',
      submenu: [
        {titulo: 'Usuarios', url: 'usuario'},
        {titulo: 'Hospitales', url:'hospital'},
        {titulo: 'Medicos', url:'medico'},
      ]
    }
  ]
  constructor() { }
}
