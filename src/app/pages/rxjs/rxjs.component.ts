import { Component, OnDestroy } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators'

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent implements OnDestroy {
  
  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }

  public intervalSubs: Subscription;

  constructor() { 

   // this.retornaObservable().pipe(
   //   retry()
   // ).subscribe(
   //   valor => console.log('Subs:', valor),
   //   error => console.warn('Error:', error),
   //   ()=> console.info('Obs terminado')
   // );

   this.intervalSubs = this.retornaIntervalo().subscribe(console.log)
  }

  retornaIntervalo(): Observable<number>{
   return interval(1000)
          .pipe(
            map(valor => valor + 1),
            filter(valor => (valor % 2 === 0) ? true:false ),
            take(4),
            
          );
  }

  retornaObservable(): Observable<number>{
    let i =-1;

    return new Observable<number>(observar => {
     
      const intervalo = setInterval(() => {
       i++;
       observar.next(i);

       if(i === 4 ){
         clearInterval(intervalo);
         observar.complete();
       }

       if(i === 2 ){
         observar.error('i llego al valor de 2')
       }
      },1000)
    })
 
  }
}
