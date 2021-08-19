import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Usuariio } from '../../models/usuario.model';
import { Hospital } from '../../models/hospital.model';
import { Medico } from '../../models/medico.model';

const base_url  = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  constructor(private http: HttpClient) { }


  get token():string{
    return localStorage.getItem('token') || '';
  } 

  get headers(){
    return {
      headers: {
        'x-token': this.token
      }
    }
  }



  private transformarUsuario (resultado: any[]):Usuariio[]{
    return resultado.map(
      user => new Usuariio(user.nombre,user.email,'', user.img, user.google, user.role, user.uid)
    );
  }

  private transformarHospital (resultado: any[]):Hospital[]{
    return resultado
  }

  private transformarMedicos (resultado: any[]):Medico[]{
    return resultado
  }
  buscar(
    tipo: 'usuarios'|'medicos'|'hospitales',
    termino: string
    ){
    const url = `${base_url}/todo/coleccion/${tipo}/${termino}`;
    console.log(url)
      return this.http.get<any[]>(url,this.headers)
            .pipe(
              map ((resp:any) => {
                switch (tipo) {
                  case 'usuarios':
                    return this.transformarUsuario(resp.resultado)
                  case 'hospitales':
                    return this.transformarHospital(resp.resultado)  
                  case 'medicos':
                    return this.transformarMedicos(resp.resultado)  
                  default:
                    return []
                }
              })
            )
  }
}
