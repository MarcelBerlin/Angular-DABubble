import { Component } from '@angular/core';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-header-dialog',
  templateUrl: './header-dialog.component.html',
  styleUrls: ['./header-dialog.component.scss']
})
export class HeaderDialogComponent {
  list = this.users.list;


  constructor(public users: UsersService) {

  }

}
