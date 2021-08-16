import { Component } from '@angular/core';
import { FormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

import { UsuarioService } from '../../services/usuario.service';
//import { type } from 'os';
//import { Color } from 'ng2-charts';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resgister',
  templateUrl: './resgister.component.html',
  styleUrls: ['./register.component.css'],
})
export class ResgisterComponent {

  public formSubmitted = false;

  public registerForm = this.fb.group({
      nombre: ['test100', [Validators.required, Validators.maxLength(10)]],
      email: ['test100@texlave.com', [Validators.required, Validators.email]],
      password: ['123123', [Validators.required]],
      password2:['123123', [Validators.required]],
      terminos: [true, [Validators.required]],
  }, {
    validators: this.passwordsIguales('password', 'password2')
  })
  constructor(private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private router: Router) { }

  crearUsuario(){
    this.formSubmitted = true;
    console.log(this.registerForm.value);

    if(this.registerForm.invalid){
      return;
    }
      // realizar el posteo
      this.usuarioService.crearUsuario(this.registerForm.value)
          .subscribe(resp => {
           //navegar al dashboard
           this.router.navigateByUrl('/');
          }, (err) => {
            //si sucede un error 
            Swal.fire('Error', err.error.msg,'error',)
          });
  }



  campoNoValido(campo:string):boolean{
   
    if(this.registerForm.get(campo).invalid && this.formSubmitted ){
      return true
    }else {
      return false
    }
  }
  constrasenaNoValidas(){
    const pass1 = this.registerForm.get('password').value
    const pass2 = this.registerForm.get('password2').value

    if((pass1 !== pass2) && this.formSubmitted){
      return true
    }else {
      return false
    }
  }

  aceptaTerminos(){
    return !this.registerForm.get('terminos').value && this.formSubmitted;
  }

  passwordsIguales(pass1Name:string, pass2Name:string){
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      if(pass1Control.value === pass2Control.value){
        pass2Control.setErrors(null);
      }else {
        pass2Control.setErrors({noEsIgual:true});
      }
    }
  }
  
}
