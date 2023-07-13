import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  public list = [{
    name: 'Frederik Beck',
    img: './assets/img/members/avatar6.png',
    email: 'fred.beck@gmail.com',
    online: false
  }, {
    name: 'Sofia Müller',
    img: './assets/img/members/avatar5.png',
    email: 'sof.müller@gmail.com',
    online: false
  }, {

    name: 'Noah Braun',
    img: './assets/img/members/avatar4.png',
    email: 'noah.braun@gmail.com',
    online: false
  }, {

    name: 'Elise Roth',
    img: './assets/img/members/avatar3.png',
    email: 'eli.roth@gmail.com',
    online: false
  }, {

    name: 'Elias Neumann',
    img: './assets/img/members/avatar2.png',
    email: 'elia.neu@gmail.co,m',
    online: false
  }, {

    name: 'Steffen Hoffmann',
    img: './assets/img/members/avatar1.png',
    email: 'stef.hoff@gmail.com',
    online: false
  }];
  
  constructor() { }
}
