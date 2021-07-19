import { Component} from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css' ]
})
export class ProgressComponent {

    progess1: number = 25;
    progess2: number = 35;

    get getProgreso1(){
      return `${this.progess1}%`
    }
    get getProgreso2(){
      return `${this.progess2}%`
    }

}
