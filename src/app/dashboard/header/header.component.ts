import { UsersService } from 'src/app/services/users.service';
import { Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatMenuTrigger, MatMenuModule } from '@angular/material/menu';
import { HeaderDialogComponent } from 'src/app/dialog/header-dialog/header-dialog.component';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { Observable } from 'rxjs';
import { collection, collectionData } from '@angular/fire/firestore';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})

export class HeaderComponent {
  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger;

  actualUser: any;

  constructor(
    public dialog: MatDialog,
    private auth: AuthService,
    public getUserData: DataService) {
  }

  filter() {

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