import { Component, OnInit } from '@angular/core';
//import { resolve } from 'dns';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styleUrls: ['./promesas.component.css']
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    this.getUsuarios().then(usuarios => {
console.log(usuarios)
    })

  //  const promesa = new Promise((resolve, reject) => {
  //   if(false){
  //     resolve('hola mundo');
  //   }else{
  //     reject('algo salio mal');
  //   }
  //  })

  //  promesa.then((msg) => {
  //    console.log(msg);
  //  })
  //  .catch(error =>  console.log('eror en la promesa', error));

  //  console.log('fin del init')
  }


  getUsuarios(){

    return new Promise(resolve => {
      fetch('https://reqres.in/api/users')
      .then(resp => resp.json())
      .then(body => resolve(body.data));
    })
    
  }
}
