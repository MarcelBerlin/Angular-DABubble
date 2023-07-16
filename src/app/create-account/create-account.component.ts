import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent {
  loading: boolean = false;
  forgotPasswordForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\.?[a-zA-Z]{0,2}')])
  });

  constructor( 
    private router: Router,
    ){}

  
    createNewAccount(): void{
      
    }


   /**
   * Navigates via router link back to the login page.
   * 
   * @returns {void}
   */
   backToLogin(): void {
    this.router.navigateByUrl('');
  }
}
