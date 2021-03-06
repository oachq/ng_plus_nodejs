import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuariio } from '../../../../models/usuario.model';
import { BusquedasService } from '../../../services/busquedas.service';
import Swal from 'sweetalert2';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit, OnDestroy {
 

  public totalUsuarios: number = 0;
  public usuarios: Usuariio[] = [];
  public usuariosTemp: Usuariio[] = [];

  public imgSubs: Subscription;
  public desde: number = 0;
  public cargando: boolean = true;

  constructor(private usuarioService:UsuarioService,
            private busquedasService:BusquedasService,
            private modalImagenService:ModalImagenService) { }
            
 ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarUsuarios();
   this.imgSubs=this.modalImagenService.nuevaImagen.pipe(delay(100)).subscribe(img => this.cargarUsuarios())
  }

  cargarUsuarios(){
    this.cargando = true
    this.usuarioService.cargarUsuarios(this.desde)
    .subscribe(({totalUser, usuarios, }) => {
      this.totalUsuarios = totalUser;
      this.usuarios = usuarios;
      this.usuariosTemp=usuarios;
      this.cargando = false
    })
  }

  cambiarPagina(valor:number){
    this.desde += valor;

    if(this.desde < 0){
      this.desde = 0;
    }else if (this.desde > this.totalUsuarios){
      this.desde -= valor;
    }
    this.cargarUsuarios();
  }

   buscar(termino:string){
     if(termino.length === 0){
       return this.usuarios = this.usuariosTemp;
     }

    this.busquedasService.buscar('usuarios',termino)
        .subscribe((resp:Usuariio[]) => {
          this.usuarios = resp
        })
  }

  eliminarUsuario(usuario: Usuariio){
    if(usuario.uid === this.usuarioService.uid){
      return Swal.fire('Error','No puede borrarse a si mismo','error');
    }
    Swal.fire({
      title: 'Are  sure?',
      text: `You won't be able to revert this! ${usuario.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.eliminarUsuario(usuario)
            .subscribe(resp => {
              this.cargarUsuarios();
              Swal.fire(
                'Usuario Borrado',
                `${usuario.nombre} fue eliminado correctamente `,
                'success'
              );
              console.log(resp)
            })
      }
    })
  }

  cambiarRole(usuario:Usuariio){
    this.usuarioService.guardarUsuario(usuario)
        .subscribe(resp=> {
          console.log(resp)
        })
  }
  
  abrirModal(usuario:Usuariio){
    this.modalImagenService.abrirModal('usuario',usuario.uid, usuario.img);
  }

}
