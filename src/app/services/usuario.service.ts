import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';

import { RegisterForm } from '../../../interfaces/register-form.interface';
import { LoginForm } from '../../../interfaces/login-form-interface';
import { Usuariio } from '../../models/usuario.model';
import { CargandoUsuario } from '../../../interfaces/cargar_user.interface';

declare const gapi:any;

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2:any;
  public usuario: Usuariio;

  constructor(private http: HttpClient,
              private router:Router,
              private ngZone: NgZone) { 

                this.googleInit();
              }

  get token():string{
    return localStorage.getItem('token') || '';
  } 

  get role(): 'ADMIN_ROLE' | 'USER_ROLE'{
    return this.usuario.role;
  }

  get uid():string {
    return this.usuario.uid || ''
  }

  get headers(){
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  googleInit(){
    return new Promise(resolve =>{
      gapi.load('auth2', ()=>{
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init({
          client_id: '492060183698-4atcbupl2ueovmrnecqvgbckf9tf2efg.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });
        resolve();
      });
    } )
   
  }

  guardarLocaStorage(token:string, menu:any){
    localStorage.setItem('token', token);
    localStorage.setItem('menu',JSON.stringify(menu))
  }
  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('menu');
    this.auth2.signOut().then( () => {
      this.ngZone.run(()=>{
        this.router.navigateByUrl('/login');
      })
    });
  }

  validarToken(): Observable<boolean>{
    
    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map((resp:any) => {
        const {email, google, img='', nombre, role,  uid} = resp.usuario;
        this.usuario = new Usuariio (nombre, email, '', img, google, role,  uid)
        this.guardarLocaStorage(resp.token, resp.menu)
        return true
      }),
     
      catchError(error => of(false))
    )
  }

  crearUsuario(formData: RegisterForm) {
    return this.http.post(`${base_url}/usuarios`, formData)
    .pipe(
      tap((resp:any) => {
        this.guardarLocaStorage(resp.token, resp.menu)
      }) 
    )
  }

  actualizarPerfil(data: {email:string, nombre:string, role: string}){
    data = {
      ...data,
      role: this.usuario.role
    }
    return this.http.put(`${base_url}/usuarios/${this.uid}`, data, this.headers)
  }

  loginUsuario(formData: LoginForm) {
    return this.http.post(`${base_url}/login`, formData)
    .pipe(
      tap((resp:any) => {
        this.guardarLocaStorage(resp.token, resp.menu)
      }) 
    )
  }


  loginGoogle(token) {
    return this.http.post(`${base_url}/login/google`, {token})
    .pipe(
      tap((resp:any) => {
        this.guardarLocaStorage(resp.token, resp.menu)
      }) 
    )
  }

  cargarUsuarios(desde:number = 0){
      const url = `${base_url}/usuarios?desde=${desde}`;
      return this.http.get<CargandoUsuario>(url,this.headers)
                .pipe(
                  map(resp => {
                    const usuarios = resp.usuarios.map(
                      user => new Usuariio(user.nombre,user.email,'', user.img, user.google, user.role, user.uid))  
                      return {
                        totalUser: resp.totalUser,
                        usuarios
                      }
                    })
                      
                )
  }

  eliminarUsuario(usuario: Usuariio){
    const url = `${base_url}/usuarios/${usuario.uid}`;
    return this.http.delete(url,this.headers)
  }

  guardarUsuario(usuario: Usuariio){
    return this.http.put(`${base_url}/usuarios/${usuario.uid}`, usuario, this.headers)
  }
}
