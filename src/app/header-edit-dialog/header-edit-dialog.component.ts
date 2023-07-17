import { Component, Input, ViewChild } from '@angular/core';
import { UsersService } from '../services/users.service';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { User } from '../models/user.class';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-header-edit-dialog',
  templateUrl: './header-edit-dialog.component.html',
  styleUrls: ['./header-edit-dialog.component.scss']
})
export class HeaderEditDialogComponent {

  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger;

  userData: any;
  loggedUser: any;

  constructor(
    public dialog: MatDialog,
    private auth: AuthService,
    public getUserData: DataService) {
    this.loggedUser = this.getUserData.loggedInUserData;
    // console.log(this.loggedUser);

  }
}