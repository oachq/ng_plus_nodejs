import { Routes, RouterModule, CanActivate } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../guards/auth.guard';

// componentes de pages con bloqueo
import { PagesComponent } from './pages.component';

const routes: Routes = [ 
    {
        path: 'dashboard', component: PagesComponent,
        canActivate:[AuthGuard],
        canLoad:[AuthGuard],
       loadChildren: () => import('./child-routes.module').then(m => m.ChildRoutesModule)
      },
];

@NgModule({
    imports: [ RouterModule.forChild(routes)],
    exports: [RouterModule ] 
})

export class PagesRoutingModule {}