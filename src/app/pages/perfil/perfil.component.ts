import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../services/usuario.service';
import { Usuariio } from '../../../models/usuario.model';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  public perfilForm: FormGroup;
  public usuario:Usuariio;
  public imagenSubir: File;
  public imgTemp: any = null;

  constructor(private fb:FormBuilder,
              private usuarioService:UsuarioService,
              private fileUploadService:FileUploadService) {

                this.usuario = usuarioService.usuario;
               }

  ngOnInit(): void {
    this.perfilForm = this.fb.group({
      nombre: [this.usuario.nombre, [Validators.required, Validators.maxLength(10)]],
      email: [this.usuario.email, [Validators.required, Validators.email]]
    })
  }


  actualizarPerfil(){
    this.usuarioService.actualizarPerfil(this.perfilForm.value)
      .subscribe(() => { // retorna lo que hay en la interfaces de usuario.interface.ts
        const { nombre, email } = this.perfilForm.value;
        this.usuario.nombre = nombre;
        this.usuario.email = email;
        Swal.fire('Guardado','Usuario Actualizado', 'success')
      }, (err) => {
        Swal.fire('error', err.error.msg,'error' )
      })
  }

  cambiarImagen(file:File){
    this.imagenSubir = file;
    if(!file){
      return this.imgTemp=null;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imgTemp = reader.result;
      
    }
  }

  subirImagen(){
    this.fileUploadService.actualizarFoto(this.imagenSubir, 'usuario', this.usuario.uid)
        .then(img => {
          this.usuario.img = img;
        Swal.fire('Guardado', 'Imagen guardada', 'success');
    }).catch(err => {
      Swal.fire('error', err.error.msg,'error' )
    })
  }
}
