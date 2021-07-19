import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
//import EventEmitter = require('events');

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit {
 
  ngOnInit(){
   this.btnClass = `btn ${this.btnClass}`
  }

  // data transmitida de padre al hijo 
// para renombrar una variable se uso "valor" como se observa: 
// @Input('valor') progreso: number = 50;
  @Input('valor') progreso: number = 50;
  @Input() btnClass: string = 'btn-primary';

  // data que transmite lo del hijo recivido 
  @Output() valorSalida: EventEmitter<number>  = new EventEmitter();



  cambiarValor(valor: number){
    if (this.progreso >= 100 && valor >= 0){
        this.valorSalida.emit(100)
      return this.progreso = 100;
    }
    if (this.progreso <= 0 && valor < 0){
      this.valorSalida.emit(0);
      return this.progreso = 0;
    }
    this.progreso = this.progreso + valor;
    this.valorSalida.emit(this.progreso);
  }

  onChange( nuevovalor: number){
    if(nuevovalor >= 100){
       this.progreso=(100)
    }else if(nuevovalor <= 0){
       this.progreso=(0)
    }else {
      this.progreso = nuevovalor;
    }
    this.valorSalida.emit(this.progreso);
  }
}
