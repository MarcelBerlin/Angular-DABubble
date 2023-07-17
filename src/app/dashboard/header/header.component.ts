import { UsersService } from 'src/app/services/users.service';
import { Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatMenuTrigger, MatMenuModule } from '@angular/material/menu';
import { HeaderDialogComponent } from 'src/app/header-dialog/header-dialog.component';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.class';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})

export class HeaderComponent {
  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger;

  userData: any;
  users: any;
  loggedUserName: string = '';
  loggedUserImg: string = '';

  constructor(
    public dialog: MatDialog,
    private auth: AuthService,
    public getUserData: DataService) {
    // this.getUserData.loggedInUserData;
    setTimeout(() => {
      console.log(this.getUserData.loggedInUserData);
      this.loggedUserImg = getUserData.loggedInUserData.img;
      this.loggedUserName = getUserData.loggedInUserData.name;
    }, 2000 );
    
  }


  /**
   * opens the dialog to show the actual user
   */
  openProfile() {
    const dialogRef = this.dialog.open(HeaderDialogComponent);
    dialogRef.afterClosed();
  }


  /**
   * logs out the actual user
   */
  logout() {
    this.auth.signOut();
  }
}