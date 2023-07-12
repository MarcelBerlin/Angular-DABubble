import { Component } from '@angular/core';
import { UsersService } from 'src/app/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  list = this.users.list;


  constructor( public users: UsersService ) {
    console.log(this.list);
  }
}
