import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { Dialog} from '@angular/cdk/dialog';
import { AddAvatarComponent } from 'src/app/dialog/add-avatar/add-avatar.component';
import { AddAvatarService } from 'src/app/dialog/add-avatar/add-avatar.service';
@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss'],
})
export class CreateAccountComponent {
  loading: boolean = false;
  passwordView: boolean = false;
  inputType: string = 'password';
  checkbox: boolean = false;
  createAccountForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(5)]),
    email: new FormControl('', [
      Validators.required,
      // Validators.email,
      Validators.pattern(
        // '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}.?[a-zA-Z]{0,2}'
        '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\.[a-zA-Z]{2,}$'
      ),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    checkbox: new FormControl(false, [Validators.required]),
    
  });


  constructor(
    private router: Router,
    public auth: AuthService,
    private dataService: DataService,
    private dialog: Dialog,
    public addAS: AddAvatarService
  ) {
    this.dataService.forgotPasswordMenu = true;
  }


  /**
   * Creates a new user account.
   * - If an image is selected, it performs the sign-up.
   * - If no image is selected and the account form is valid, it opens a dialog for avatar selection.
   * 
   * @returns {void}
   */
  createNewAccount(): void {
    if (this.addAS.imgSelectedOK) this.signUp();
    else if (this.createAccountForm.valid) {
        this.addAS.name = this.createAccountForm.value.name;
        this.dialog.open(AddAvatarComponent);
      }
  }


  /**
   * Performs user sign-up using the values from the account form.
   * 
   * @returns {void}
   */
  signUp():void {
    this.auth.signup( 
      this.createAccountForm.value.email,
      this.createAccountForm.value.password,
      this.createAccountForm.value.name,
      this.addAS.pickedAvatar
    );
  }


  /**
   * Navigates via router link back to the login page.
   *
   * @returns {void}
   */
  backToLogin(): void {
    this.router.navigateByUrl('');
  }


  /**
   * Toggles the password visibility.
   * 
   * @returns {void}
   */
  passwordViewToggle(): void {
    this.passwordView = !this.passwordView;
    if (this.passwordView == true) this.inputType = 'text';
    else this.inputType = 'password';
  }


  /**
   * Sets the selected imprint or data protection element.
   *
   * @param {string} element - The element to be selected (imprint or data protection).
   * @returns {void} - Any return value description, if applicable.
   */
  openDataProtection(): void {
    this.auth.selectedImprintOrDataProtection = 'dataProtection';
  }
}
