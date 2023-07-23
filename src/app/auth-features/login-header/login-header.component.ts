import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-login-header',
  templateUrl: './login-header.component.html',
  styleUrls: ['./login-header.component.scss']
})
export class LoginHeaderComponent {

  
  constructor(
    private router: Router,
    public dataService: DataService,
  ) { }

  
  /**
   * Navigates to the 'createAccount' route using the router.
   * 
   *  @returns {void}
   */
  goTocreateAccount(): void {
    this.router.navigateByUrl('createAccount');
  }
}

