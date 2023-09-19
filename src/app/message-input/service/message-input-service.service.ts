import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class MessageInputServiceService{
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

  inputDiv: any;

  constructor( ) {
    
   }

  insertCalled: any;
  changeInput: string = '';
  insertEmoji(emoji): void {
      this.setId += 1;
      this.textContent = emoji;
      this.emailContent = 'unset';
      this.class = 'emoji';
      this.linkTaget = 'unset';
      this.name  = 'Stefan Boskamp';
      this.filename = 'filename';
      this.nameType = 'EmojiType';
      this.userId = '';
      this.insertCalled= true;
      this.changeInput = 'Test';
      console.log(this.insertCalled);
  }







  

}
