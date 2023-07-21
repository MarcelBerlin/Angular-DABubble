import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-header',
  templateUrl: './login-header.component.html',
  styleUrls: ['./login-header.component.scss']
})
export class LoginHeaderComponent {

  
  constructor(
    private router: Router,
  ) { }


  goTocreateAccount(): void {
    this.router.navigateByUrl('createAccount');
  }
}

