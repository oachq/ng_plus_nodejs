import { Component, OnInit } from '@angular/core';

import { SetingsService } from '../../services/setings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {

  constructor(private setingsService: SetingsService) { }

  ngOnInit(): void {
 this.setingsService.checkCurrentTheme();
 
  }

  changeTheme(theme:string){
    
   this.setingsService.changeTheme(theme);

  }

 
}
