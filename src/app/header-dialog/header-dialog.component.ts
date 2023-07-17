import { Component, Input } from '@angular/core';
import { UsersService } from '../services/users.service';
import {MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { HeaderEditDialogComponent } from '../header-edit-dialog/header-edit-dialog.component';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';
// import { User } from '../models/user.class';

@Component({
  selector: 'app-header-dialog',
  templateUrl: './header-dialog.component.html',
  styleUrls: ['./header-dialog.component.scss']
})
export class HeaderDialogComponent {

  userData: any;
  loggedUser: any;

  constructor(
    public dialog: MatDialog,
    private auth: AuthService,
    public getUserData: DataService) {
    this.loggedUser = this.getUserData.loggedInUserData;
    // console.log(this.loggedUser);
  }



  @Input() online = false; // mit user verknüpfen ---- bpsw: user.online

  editingProfile() {
    const dialogRef = this.dialog.open(HeaderEditDialogComponent);
    dialogRef.afterClosed();
  }

}
