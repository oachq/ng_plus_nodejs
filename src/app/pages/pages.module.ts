import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {RouterModule } from '@angular/router'
//import { AppRoutingModule } from '../app-routing.module';

//modulos personalisados 
import { SharedModule } from '../shared/shared.module'; // modulo del shared module. 

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';



@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent
  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
    //AppRoutingModule
    ]
})
export class PagesModule { }