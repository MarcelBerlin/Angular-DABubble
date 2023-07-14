import { Injectable } from '@angular/core';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { DialogInfoService } from './dialog-info.service';
import { DialogInfoComponent } from '../dialog-info/dialog-info.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(
    private afs: AngularFireAuth, 
    private router: Router,
    public dialogInfoService: DialogInfoService,
    public dialog: MatDialog,
    ) { }


  signInWithGoogle(){
    return this.afs.signInWithPopup(new GoogleAuthProvider());
  }


  /**
   * Signs in the user with the provided email and password.
   * 
   * @param {object} user - The user object containing the email and password. 
   * @returns {Promise<firebase.auth.userCredential>} - A promise that resolves with the sign-in result. 
   */
  signWithEmailAndPassword(user: { email: string, password: string }):Promise<any> {
    return this.afs.signInWithEmailAndPassword(user.email, user.password);
  }


  /**
   * Sets the user email in the local storage.
   * 
   * @param {object} userData - The user data object containing the email and password.
   * @returns {void} 
   */
  setLocalStorage(userData: { email: string, password: string }): void {
    localStorage.setItem('user', JSON.stringify(userData.email));
  }


  /**
   * Signs out the user.
   * 
   * @returns {Promise<any>} - A promise that resolves when the sign-out process is completed. 
   */
  async signOut(): Promise<any> {
    return this.afs.signOut().then(() => {
      localStorage.removeItem('user');
      // localStorage.removeItem('userId');
      this.router.navigate(['']);
    });
  }


  /**
   * Checks if the user is currently logged in.
   * 
   * @returns {boolean} - A boolean indicating whether the user is logged in.
   */
  get isLoggedIn(): boolean {
    // let user: Login;
    if (localStorage.getItem('user')) {
      let jsonSting: any = localStorage.getItem('user');
      let user = JSON.parse(jsonSting);
      // console.log('User =',user);
      
      return (user !== null && user.email !== false) ? true : false;
    } else {
      return false;
    }
  }


  /**
   * Signs up a new user with the provided email and password.
   * 
   * @param {string} email - The email address of the user.
   * @param {string} password - The password of the user.
   * @returns {void} 
   */
  signup(email: string, password: string): void {
    this.afs.createUserWithEmailAndPassword(email, password)
      .then((userCredentials: any) => {
        this.router.navigate(['login']);
        this.openDialogSuccessfullySignup();
        // this.dataService.saveSignUpUserEmail(email);
      }).catch((error) => {
        if (error.code === 'auth/email-already-in-use') this.openDialogEmailAlreadyExist();
        else if (error.code === 'auth/network-request-failed') this.openDialogNoServerConnection();
        else this.openDialogSystemFailure();
      });
  }


  /**
   * Opens the dialog to display an info message for an existing email during signup.
   * 
   * @returns {void}
   */
  openDialogEmailAlreadyExist(): void {
    this.dialogInfoService.setDialogInfoText(0);
    this.dialog.open(DialogInfoComponent);
  }


  /**
   * Opens the dialog to display a success message after successful signup.
   * 
   * @returns {void}
   */
  openDialogSuccessfullySignup(): void {
    this.dialogInfoService.setDialogInfoText(4);
    this.dialog.open(DialogInfoComponent);
  }


  /**
   * Opens the dialog to display an info message for no server connection.
   * 
   * @returns {void}
   */
  openDialogNoServerConnection(): void {
    this.dialogInfoService.setDialogInfoText(6);
    this.dialog.open(DialogInfoComponent);
  }


  /**
   * Opens the dialog to display a system failure message.
   * 
   * @returns {void}
   */
  openDialogSystemFailure(): void {
    this.dialogInfoService.setDialogInfoText(5);
    this.dialog.open(DialogInfoComponent);
  }


  /**
   * Opens the dialog to display an info message for an unknown email during password reset.
   * 
   * @returns {void}
   */
  openDialogPasswordResetEmailUnknown(): void {
    this.dialogInfoService.setDialogInfoText(3);
    this.dialog.open(DialogInfoComponent);
  }


  /**
   * Opens the dialog to display a success message after sending the password reset email.
   * 
   * @returns {void}
   */
  openDialogPasswordResetEmailSend(): void {
    this.dialogInfoService.setDialogInfoText(2);
    this.dialog.open(DialogInfoComponent);
  }


  /**
   * Sends a password reset email to the provided email address.
   * 
   * @param {string} passwordResetEmail - The email address for password reset. 
   * @returns {Promise<void>} - A promise that resolves when the password reset email is sent. 
   */
  forgotPassword(passwordResetEmail: string) {
    return this.afs
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        this.openDialogPasswordResetEmailSend();
      })
      .catch((error) => {
        if (error.code === 'auth/user-not-found') this.openDialogPasswordResetEmailUnknown();
        else if (error.code === 'auth/network-request-failed') this.openDialogNoServerConnection();
        else this.openDialogSystemFailure();
      });
  }
}
