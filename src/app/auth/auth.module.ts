import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

//componentes de login y register 
import { LoginComponent } from './login/login.component';
import { ResgisterComponent } from './resgister/resgister.component';


@NgModule({
  declarations: [
    LoginComponent,
    ResgisterComponent, 
  ],
  exports: [ 
    LoginComponent,
    ResgisterComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class AuthModule { }
