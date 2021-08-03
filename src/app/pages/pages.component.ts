import { Component, OnInit } from '@angular/core';

import { SetingsService } from '../services/setings.service';

declare function customInitFunctions();
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

 

  constructor(private setingsService: SetingsService ) { }

  ngOnInit(): void {
    customInitFunctions();
  }

}
