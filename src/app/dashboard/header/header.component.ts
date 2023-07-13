import { UsersService } from 'src/app/services/users.service';
import {Component, ViewChild} from '@angular/core';
import {MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatMenuTrigger, MatMenuModule} from '@angular/material/menu';
import { HeaderDialogComponent } from 'src/app/header-dialog/header-dialog.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})

export class HeaderComponent {
  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger;
  list = this.users.list;


  constructor(public users: UsersService, public dialog: MatDialog, private auth: AuthService) {
    console.log(this.list);
  }

  
  openProfile() {
    const dialogRef = this.dialog.open(HeaderDialogComponent);
    dialogRef.afterClosed();
  }


  logout() { 
    this.auth.signOut();
  }
}