import { Component, Input } from '@angular/core';
import { UsersService } from '../services/users.service';
import {MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { HeaderEditDialogComponent } from '../header-edit-dialog/header-edit-dialog.component';
import { User } from '../models/user.class';

@Component({
  selector: 'app-header-dialog',
  templateUrl: './header-dialog.component.html',
  styleUrls: ['./header-dialog.component.scss']
})
export class HeaderDialogComponent {
  list = this.users.list;
  // user = new User();


  @Input() online = false; // mit user verknüpfen ---- bpsw: user.online

  constructor(public users: UsersService, public dialog: MatDialog) {
    // console.log('User online = ',this.user.online);
  }

  editingProfile() {
    const dialogRef = this.dialog.open(HeaderEditDialogComponent);
    dialogRef.afterClosed();
  }

}
