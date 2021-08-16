import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuariio } from '../../../models/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent  {

  public usuario: Usuariio;

  constructor(private usuarioService:UsuarioService) { 
    this.usuario = usuarioService.usuario;
  }

  logout(){
    this.usuarioService.logout();
  }

}
