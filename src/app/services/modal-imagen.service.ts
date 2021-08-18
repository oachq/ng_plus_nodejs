import { Injectable, EventEmitter } from '@angular/core';
import { environment } from '../../environments/environment';

const base_ulr = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {

  private _ocultarModal: boolean = true;
  public tipo: 'usuario'|'medico'|'hospital';
  public id: string;
  public img : string;

  public nuevaImagen: EventEmitter<string> = new EventEmitter<string>();
  
  get ocultarModal(){
    return this._ocultarModal;
  }

  abrirModal(
    tipo:'usuario'|'medico'|'hospital',
    id: string,
    img: string = 'no_img', 
    ){
    this._ocultarModal= false;
    this.tipo= tipo;
    this.id= id;

    if(img.includes('https')){
      this.img = img;
    }else {
      this.img = `${base_ulr}/uploads/${tipo}/${img}`
    }

  }

  cerrarModal(){
    this._ocultarModal= true
  }
  constructor() { }
}
