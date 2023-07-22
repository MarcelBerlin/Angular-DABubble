import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  email: any = '';
  loading: boolean = false;
  forgotPasswordForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\.?[a-zA-Z]{0,2}')])
  });


  constructor( 
    private authService: AuthService,
    private router: Router,
    ){}

  /**
   * Sends a password reset request.
   * 
   * @returns {void}
   */
  sendResetRequest(): void {
    this.loading = true;
    this.forgotPasswordForm.disable();
    this.email = this.forgotPasswordForm.value.email;
    this.authService.forgotPassword(this.email);
    this.backToLogin();
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
