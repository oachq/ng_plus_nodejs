import { Component, OnInit, OnDestroy } from '@angular/core';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { HospitalService } from '../../../services/hospital.service';
import { Hospital } from '../../../../models/hospital.model';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { Subscription } from 'rxjs';
import { BusquedasService } from '../../../services/busquedas.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit, OnDestroy {

  public hospitales: Hospital[] = [];
  public cargando: boolean = true;

  public imgSubs: Subscription;

  constructor(private hospitalService:HospitalService,
              private modalImagenService:ModalImagenService,
              private busquedasService:BusquedasService,) { }

  
ngOnDestroy(): void {
  this.imgSubs.unsubscribe();
}

  ngOnInit(): void {
  this.cargandoHospitales();

  this.imgSubs=this.modalImagenService.nuevaImagen.pipe(delay(100)).subscribe(img => this.cargandoHospitales())
  }

  buscar(termino:string){
    if(termino.length === 0){
      return this.cargandoHospitales(); 
    }

   this.busquedasService.buscar('hospitales',termino)
       .subscribe(resp => {
         console.log(resp)
         this.hospitales = resp
       })
 }

  cargandoHospitales(){
    this.cargando = true ;
    this.hospitalService.cargarHospitales()
    .subscribe(hospitales => {
      this.cargando = false ;
      this.hospitales = hospitales;
    })
  }

  guardarCambios(hospital: Hospital){
   this.hospitalService.actualizrHospitales(hospital._id, hospital.nombre)
      .subscribe(resp => {
        Swal.fire('Actualizado', hospital.nombre, 'success');
      });
  }

  eliminarHospital(hospital: Hospital){
    this.hospitalService.borrarHospitales(hospital._id)
       .subscribe(resp => {
         this.cargandoHospitales();
         Swal.fire('Borrado', hospital.nombre, 'success');
       });
   }

   async abrirSweetAlert(){
     const {value=""} = await Swal.fire<string>({
      title: 'Crear Hospital',
      text: 'Ingrese el nombre del nuevo hospital',
       input: 'text',
       inputPlaceholder:'nombre hospital',
       showCancelButton: true,
     })
     if(value.trim().length > 0){
       this.hospitalService.crearHospitales(value)
          .subscribe(resp => {
           this.cargandoHospitales();
          })
     }
   }

   abrirModal(hospital: Hospital){
    this.modalImagenService.abrirModal('hospital',hospital._id, hospital.img);
   }


 
}
