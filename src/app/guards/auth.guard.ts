import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanLoad } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { tap, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  
  canLoad(route: import("@angular/router").Route, segments: import("@angular/router").UrlSegment[]): boolean | UrlTree | import("rxjs").Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.usuarioService.validarToken()
    .pipe(
      tap(estaAutenticado => {
        if(!estaAutenticado){
          this.router.navigateByUrl('/login')
        }
      })
    );
  }

  constructor(private usuarioService:UsuarioService,
              private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
      
    return this.usuarioService.validarToken()
            .pipe(
              tap(estaAutenticado => {
                if(!estaAutenticado){
                  this.router.navigateByUrl('/login')
                }
              })
            );
  }
  
}
