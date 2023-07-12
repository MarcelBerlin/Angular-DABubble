import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  public list = [{
    name: 'Frederik Beck',
    img: './assets/img/members/avatar6.png'
  }, {
    name: 'Sofia Müller',
    img: './assets/img/members/avatar5.png'
  }, {

    name: 'Noah Braun',
    img: './assets/img/members/avatar4.png'
  }, {

    name: 'Elise Roth',
    img: './assets/img/members/avatar3.png'
  }, {

    name: 'Elias Neumann',
    img: './assets/img/members/avatar2.png'
  }, {

    name: 'Steffen Hoffmann',
    img: './assets/img/members/avatar1.png'
  }];
  
  constructor() { }
}
