import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';

import { RegisterForm } from '../../../interfaces/register-form.interface';
import { LoginForm } from '../../../interfaces/login-form-interface';
import { Usuariio } from '../../models/usuario.model';

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

  get uid():string {
    return this.usuario.uid || ''
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

  logout(){
    localStorage.removeItem('token');
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
        localStorage.setItem('token', resp.token);
        return true
      }),
     
      catchError(error => of(false))
    )
  }

  crearUsuario(formData: RegisterForm) {
    return this.http.post(`${base_url}/usuarios`, formData)
    .pipe(
      tap((resp:any) => {
        localStorage.setItem('token', resp.token);
      }) 
    )
  }

  actualizarPerfil(data: {email:string, nombre:string, role: string}){
    data = {
      ...data,
      role: this.usuario.role
    }
    return this.http.put(`${base_url}/usuarios/${this.uid}`, data, {
      headers: {
        'x-token': this.token
      }
    })
  }

  loginUsuario(formData: LoginForm) {
    return this.http.post(`${base_url}/login`, formData)
    .pipe(
      tap((resp:any) => {
        localStorage.setItem('token', resp.token);
      }) 
    )
  }


  loginGoogle(token) {
    return this.http.post(`${base_url}/login/google`, {token})
    .pipe(
      tap((resp:any) => {
        localStorage.setItem('token', resp.token);
      }) 
    )
  }
}
