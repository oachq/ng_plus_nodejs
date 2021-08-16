import { Component, OnInit, NgZone  } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';

  declare const gapi:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  ngOnInit(): void {
    this.renderButton();
  }

  public formSubmitted = false;
  public auth2: any;

  public loginForm = this.fb.group({
    email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['123123', [Validators.required]],
    remember:[true]
})


  constructor(private router: Router,
              private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private ngZone: NgZone) { }

  login(){
     this.formSubmitted = true;

     if(this.loginForm.invalid){
       return;
     }
      // realizar el posteo
      this.usuarioService.loginUsuario(this.loginForm.value)
          .subscribe(resp => {
        
            if (this.loginForm.get('remember').value){
              localStorage.setItem('email', this.loginForm.get('email').value);
            }else {
              localStorage.removeItem('email')
            }

             //navegar al dashboard
             this.router.navigateByUrl('/');


          }, (err) => {
            //si sucede un error 
            Swal.fire('Error', err.error.msg,'error',)
          });
    
  }


  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
    });

    this.startApp();
  }

   async startApp() {
     await this.usuarioService.googleInit();
     this.auth2 = this.usuarioService.auth2;

    this.attachSignin(document.getElementById('my-signin2'));
  }

    attachSignin(element) {
     // console.log(element.id);
      this.auth2.attachClickHandler(element, {},
          (googleUser) => {
            const id_token = googleUser.getAuthResponse().id_token;
            this.usuarioService.loginGoogle(id_token).subscribe(resp =>{
              this.ngZone.run(()=> {
                //navegar al dashboard
                this.router.navigateByUrl('/');
              })
             
            });
           

          }, (error) => {
            alert(JSON.stringify(error, undefined, 2));
          });
    }
}
