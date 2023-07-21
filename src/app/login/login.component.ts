import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogInfoComponent } from '../dialog/dialog-info/dialog-info.component';
import { DialogInfoService } from '../services/dialog-info.service';
import { Login } from '../login';
import { DataService } from '../services/data.service';
import { User } from '../models/user.class';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loading: boolean = false;
  passwordView: boolean = false;
  inputType: string = 'password';
  email: string = '';
  password: string = '';
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\.?[a-zA-Z]{0,2}')]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });


  constructor(
    private router: Router,
    private authService: AuthService,
    public dialog: MatDialog,
    public dialogInfoService: DialogInfoService,
    private dataService: DataService,
  ) { }

  
  /**
   * Logs in the user using the Google authentication provider.
   * 
   * @returns {void}
   */
  loginWithGoogle():void {
    this.loading = true;
    this.authService.signInWithGoogle().then((res: any) => {
      this.authService.setLocalStorage({ email: res.additionalUserInfo.profile.email, password: '' });
      this.router.navigateByUrl('dashboard');
      this.setUserData(res.additionalUserInfo.profile);
      this.dataService.getLoggedInUserData();
      this.loading = false;
    }).catch((error: any) => {
      this.loading = false;
      console.error(error);
    });
  }


  /**
   * Sets the user data based on the provided Google data.
   * 
   * @param {object} googleData - The Google data containing user information.
   * @returns {void}
   */
  setUserData(googleData: any): void {
    const email:string = googleData.email;
    const familyName:string = googleData.family_name;
    const given_name:string = googleData.given_name;
    const userData: User = new User();
    userData.email = email;
    userData.name = given_name + ' ' + familyName;
    setTimeout(() => {
      this.dataService.createGoogleUser(userData);
    }, 500);
  }


  /**
   * Performs login with email and password.
   * 
   * @returns {void}
   */
  loginWithEmailAndPassword(): void {
    this.loading = true;
    this.loginForm.disable();
    this.authService.signWithEmailAndPassword(this.getLoginFormData()).then((res: any) => {
      this.loginOkProgramSettings();
    }).catch((error: any) => {
      this.loginFailedProgramSettings();
      if (error.code === 'auth/user-not-found') this.dialogLoginEmailUnknown();
      else if (error.code === 'auth/wrong-password') this.dialogLoginPasswordWrong();
      else if (error.code === 'auth/network-request-failed') this.dialogNoServerConnection();
      else this.dialogSystemError();
    });
  }


  /**
   * Opens the dialog to display an info message for an unknown login email.
   * 
   * @returns {void}
   */
  dialogLoginEmailUnknown(): void {
    this.dialogInfoService.setDialogInfoText(1);
    this.dialog.open(DialogInfoComponent);
  }


  /**
   * Opens the dialog to display an info message for a wrong login password.
   * 
   * @returns {void}
   */
  dialogLoginPasswordWrong(): void {
    this.dialogInfoService.setDialogInfoText(7);
    this.dialog.open(DialogInfoComponent);;
  }


  /**
   * Opens the dialog to display an info message for no server connection.
   * 
   * @returns {void}
   */
  dialogNoServerConnection(): void {
    this.dialogInfoService.setDialogInfoText(6);
    this.dialog.open(DialogInfoComponent);;
  }


  /**
   * Opens the dialog to display a system error message.
   * 
   * @returns {void}
   */
  dialogSystemError(): void {
    this.dialogInfoService.setDialogInfoText(5);
    this.dialog.open(DialogInfoComponent);;
  }


  /**
   *  Retrieves login form data.
   * 
   * @returns {Login} The login form data.
   */
  getLoginFormData(): Login {
    this.email = this.loginForm.value.email;
    this.password = this.loginForm.value.password;
    return { email: this.email.toLowerCase(), password: this.password };
  }


  /**
   * Handles program settings after successful login.
   * 
   * @returns {void}
   */
  loginOkProgramSettings(): void {
    this.authService.setLocalStorage(this.getLoginFormData());
    this.dataService.loggedInUserEmail = this.getLoginFormData().email;
    this.dataService.getLoggedInUserData();
    this.router.navigateByUrl('dashboard');
    this.loading = false;
    this.loginForm.enable();
  }


  /**
   * Handles program settings after login failure.
   * 
   * @returns {void}
   */
  loginFailedProgramSettings(): void {
    this.loading = false;
    this.loginForm.enable();
  }


  /**
   * Initiates the forgot password process.
   * 
   * @returns {void}
   */
  openDialogForgotPassword(): void {
    // this.dialog.open(DialogForgotPasswordComponent);
  }


  /**
   * Toggles the password visibility.
   */
  passwordViewToggle(): void {
    this.passwordView = !this.passwordView;
    if (this.passwordView == true) this.inputType = 'text';
    else this.inputType = 'password';
  }


  /**
   * Performs a guest login by setting the login form values to a predefined guest email and password,
   * and then calling the loginWithEmailAndPassword function.
   * 
   * @returns {void}
   */
  guestLogin(): void {
    this.loginForm.patchValue({
      email: 'guest@guest.de',
      password: 'Guest123456789'
    });
    this.loginWithEmailAndPassword();
  }


  goTocreateAccount(): void {
    this.router.navigateByUrl('createAccount');
  }
}