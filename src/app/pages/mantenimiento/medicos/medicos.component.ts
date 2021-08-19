import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { BusquedasService } from '../../../services/busquedas.service';
import { Medico } from '../../../../models/medico.model';
import { MedicoService } from '../../../services/medico.service';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit, OnDestroy {

  public medicos: Medico[] = [];
  public cargando: boolean = true;

  public imgSubs: Subscription;

  constructor(private medicoService:MedicoService,
              private modalImagenService:ModalImagenService,
              private busquedasService:BusquedasService) { }

ngOnDestroy(): void {
  this.imgSubs.unsubscribe();
}              

  ngOnInit(): void {
    this.cargandoMedicos();

    this.imgSubs=this.modalImagenService.nuevaImagen.pipe(delay(100)).subscribe(img => this.cargandoMedicos())

  }

  cargandoMedicos(){
    this.cargando = true ;
    this.medicoService.cargarMedicos()
    .subscribe((resp:any) => {
      this.cargando = false ;
      this.medicos = resp;

    })
  }
  buscar(termino:string){
    if(termino.length === 0){
      return this.cargandoMedicos(); 
    }

   this.busquedasService.buscar('medicos',termino)
       .subscribe(resp => {
         this.medicos = resp
       })
  }

  abrirModal(medico){
    this.modalImagenService.abrirModal('medico', medico._id, medico.img);
  }

  borrarMedico(medico:Medico){
    Swal.fire({
      title: 'Are  sure?',
      text: `You won't be able to revert this! ${medico.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.medicoService.borrarMedico(medico._id)
            .subscribe(resp => {
              this.cargandoMedicos();
              Swal.fire(
                'Medico Borrado',
                `${medico.nombre} fue eliminado correctamente `,
                'success'
              );
              console.log(resp)
            })
      }
    })
  }

}
