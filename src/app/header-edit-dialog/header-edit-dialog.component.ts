import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';
import { collection, doc, setDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-header-edit-dialog',
  templateUrl: './header-edit-dialog.component.html',
  styleUrls: ['./header-edit-dialog.component.scss']
})
export class HeaderEditDialogComponent {

  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger;
  @ViewChild('inputName') inputName: ElementRef;
  @ViewChild('inputMail') inputMail: ElementRef;

  loggedUserName: string = '';
  loggedUserImg: string = '';
  loggedUserMail: string = '';

  newInputName: string = '';
  newInputMail: string = '';

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
    console.log('inputvalue',this.inputMail.nativeElement.value);
    console.log('inputvalue',this.inputName.nativeElement.value);

    this.inputName.nativeElement.value = this.loggedUserName; // setDoc()
    this.inputMail.nativeElement.value = this.loggedUserMail; // setDoc()

    setTimeout(() => {
      console.log('DataService value',this.loggedUserName);
      console.log('DataService value',this.loggedUserMail);
    }, 1000)
  
  }
}