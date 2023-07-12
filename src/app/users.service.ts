import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  public list = [{
    name: 'Frederik Beck',
    img: './assets/img/members/avatar6.png',
    email: 'fred.beck@gmail.com'
  }, {
    name: 'Sofia Müller',
    img: './assets/img/members/avatar5.png',
    email: 'sof.müller@gmail.com'
  }, {

    name: 'Noah Braun',
    img: './assets/img/members/avatar4.png',
    email: 'noah.braun@gmail.com'
  }, {

    name: 'Elise Roth',
    img: './assets/img/members/avatar3.png',
    email: 'eli.roth@gmail.com'
  }, {

    name: 'Elias Neumann',
    img: './assets/img/members/avatar2.png',
    email: 'elia.neu@gmail.co,m'
  }, {

    name: 'Steffen Hoffmann',
    img: './assets/img/members/avatar1.png',
    email: 'stef.hoff@gmail.com'
  }];
  
  constructor() { }
}
