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
    }
  ]
  constructor() { }
}
