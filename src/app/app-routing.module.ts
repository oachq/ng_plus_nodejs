//this file, is a function about path all urls 
// este archivo es para las path del app 

import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';

// routs children of pages
import { PagesRoutingModule } from './pages/pages.routing';
import { AuthRoutingModule } from './auth/auth.routing';


import { NopagefoundComponent } from './nopagefound/nopagefound.component';

const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch:'full'},
  {path: '**', component: NopagefoundComponent},
  
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    PagesRoutingModule,
    AuthRoutingModule
  ],
  exports: [
    RouterModule,
    
  ]
})
export class AppRoutingModule { }
