import { Component, Input } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { HeaderEditDialogComponent } from '../header-edit-dialog/header-edit-dialog.component';
import { AuthService } from '../../services/auth.service';
import { DataService } from '../../services/data.service';
import { DialogUploadComponent } from 'src/app/file-upload/dialog-upload/dialog-upload.component';

@Component({
  selector: 'app-header-dialog',
  templateUrl: './header-dialog.component.html',
  styleUrls: ['./header-dialog.component.scss']
})
export class HeaderDialogComponent {
  
  loggedUserStatus: boolean = true;


  constructor(
    public dialog: MatDialog,
    private auth: AuthService,
    public getUserData: DataService) {

    // setTimeout(() => {
    //   this.loggedUserImg = getUserData.loggedInUserData.img;
    //   this.loggedUserName = getUserData.loggedInUserData.name;
    //   this.loggedUserMail = getUserData.loggedInUserData.email;
    //   this.loggedUserStatus = getUserData.loggedInUserData.online;
    // }, 1000);
  }

  editingProfile() {
    const dialogRef = this.dialog.open(HeaderEditDialogComponent);
    dialogRef.afterClosed();
  }


  // edit by Bossi to upload profile image
  uploadImg(){
    this.dialog.open(DialogUploadComponent);
    console.log('upload image');
  }

}
