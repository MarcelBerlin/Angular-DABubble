import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageInputServiceService {
  inputLinks: any[] = [];
  textContent: string = '@Stefan';
  emailContent: string = 'test@test.de';
  class: string = 'member';
  linkTaget: string = 'unset';
  setId: number = -1;
  name: string = 'Stefan Boskamp';
  filename: string = 'filename';
  nameType: string = 'NameType';
  userId: string = '';

  contentArray: any[] = [];

  showInputInfo: boolean = false;
  shownId: number = 0;

  constructor() { }


}
