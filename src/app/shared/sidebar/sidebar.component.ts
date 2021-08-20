import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { UsuarioService } from '../../services/usuario.service';
import { Usuariio } from '../../../models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {
  
  public usuario: Usuariio;
  //menuItems: any[];

  constructor(public sidebarService:SidebarService,
              private usuarioService:UsuarioService) { 
    //this.menuItems = sidebarService.menu;
    this.usuario = usuarioService.usuario;
              
  }

  ngOnInit(): void {
  }

}
