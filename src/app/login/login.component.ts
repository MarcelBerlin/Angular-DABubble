import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loading = false;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\.?[a-zA-Z]{0,2}')]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  constructor(private router: Router, private authService: AuthService){}


  loginWithEmailAndPassword(): void {

  }

  forgotPassword(): void {
    
  }

  loginWithGoogle(){
    this.authService.signInWithGoogle().then((res: any)=>{
      console.log('logged in with google');
      this.router.navigateByUrl('dashboard');
    }).catch((error: any)=>{
      console.error(error);
    });
  }
}
