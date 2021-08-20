import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuariio } from '../../../models/usuario.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent  {

  public usuario: Usuariio;

  constructor(private usuarioService:UsuarioService,
              private router: Router) { 

    this.usuario = usuarioService.usuario;
  }

  logout(){
    this.usuarioService.logout();
  }

  buscar(termino:string){
    if(termino.length === 0 ){
      this.router.navigateByUrl('/dashboard');
    }
    this.router.navigateByUrl(`/dashboard/buscar/${termino}`)
  }

}
