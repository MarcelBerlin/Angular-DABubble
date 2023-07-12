import { UsersService } from 'src/app/users.service';
import {Component, ViewChild} from '@angular/core';
import {MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatMenuTrigger, MatMenuModule} from '@angular/material/menu';
import { HeaderDialogComponent } from 'src/app/header-dialog/header-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  // standalone: true,
  // imports: [MatButtonModule, MatMenuModule, MatDialogModule],
})

export class HeaderComponent {
  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger;
  list = this.users.list;


  constructor(public users: UsersService, public dialog: MatDialog) {
    console.log(this.list);
  }

  openProfile() {
    const dialogRef = this.dialog.open(HeaderDialogComponent);
    dialogRef.afterClosed().subscribe(() => this.menuTrigger.focus());
  }

  logout() { 

  }
}