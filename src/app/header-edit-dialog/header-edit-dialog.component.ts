import { Component, Input, ViewChild } from '@angular/core';
import { UsersService } from '../services/users.service';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-header-edit-dialog',
  templateUrl: './header-edit-dialog.component.html',
  styleUrls: ['./header-edit-dialog.component.scss']
})
export class HeaderEditDialogComponent {

  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger;
  @Input() online = false; // mit user verknüpfen ---- bpsw: list[i].online
  
  list = this.users.list;

  
  
  constructor(public users: UsersService, public dialog: MatDialog) {
    console.log(this.list);
  }
}