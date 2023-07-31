import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { AuthService } from '../../services/auth.service';
import { DataService } from '../../services/data.service';
import {ErrorStateMatcher} from '@angular/material/core';
import { FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-header-edit-dialog',
  templateUrl: './header-edit-dialog.component.html',
  styleUrls: ['./header-edit-dialog.component.scss']
})
export class HeaderEditDialogComponent {

  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger;
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  matcher = new ErrorStateMatcher();

  loggedUserName: string = '';
  loggedUserImg: string = '';
  loggedUserMail: string = '';

  newInputName: string = ''; // [(ngModel)]
  newInputMail: string = ''; // [(ngModel)]

  constructor(
    public dialog: MatDialog,
    private auth: AuthService,
    public getUserData: DataService) {

    setTimeout(() => {
      this.loggedUserImg = getUserData.loggedInUserData.img;
      this.loggedUserName = getUserData.loggedInUserData.name;
      this.loggedUserMail = getUserData.loggedInUserData.email;
    }, 1000);
  }

  saveUserChanges() {
    this.getUserData.loggedInUserData.name = this.newInputName;
    this.getUserData.loggedInUserData.email = this.newInputMail;
    this.getUserData.loggedInUserEmail = this.newInputMail;
    this.getUserData.updateUser();
  }
}