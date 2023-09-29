import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
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
  createAccountForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(5)]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern(
        '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}.?[a-zA-Z]{0,2}'
      ),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  constructor(
    private router: Router,
    private auth: AuthService,
    private dataService: DataService,
    private dialog: Dialog,
    public addAS: AddAvatarService
  ) {
    this.dataService.forgotPasswordMenu = true;
  }

  createNewAccount(): void {
    if (this.addAS.imgSelectedOK) {
      this.auth.signup(
        this.createAccountForm.value.email,
        this.createAccountForm.value.password,
        this.createAccountForm.value.name,
        this.addAS.pickedAvatar
      );
    } else {
      if (
        (this.createAccountForm.value.email,
        this.createAccountForm.value.password,
        this.createAccountForm.value.name)
      ) {
        this.addAS.name = this.createAccountForm.value.name;
        this.dialog.open(AddAvatarComponent);
      }
    }
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
   */
  passwordViewToggle(): void {
    this.passwordView = !this.passwordView;
    if (this.passwordView == true) this.inputType = 'text';
    else this.inputType = 'password';
  }
}
