import { Injectable } from '@angular/core';
import { DirectChatService } from '../direct-chat/services/direct-chat.service';

@Injectable({
  providedIn: 'root'
})
export class UserToMessageService {
  showInfoBox: number = -1;
  saveArray: any = []; // das ist das array wo bei druck auf senden alles gespeichert wird
  memberCache = [{ number: 0, member: '', id: 0 , email: 'unset', userId: 'unset'}]; // Zwischenspeicher


  constructor(private directChatService: DirectChatService) { }


  insertEmoji(emoji){
    this.memberCache.push({
      number: -1,
      member: emoji,
      id: -1,
      email: 'unset',
      userId: 'unset',
    });
  }


  send() {
    for (let i = 0; i < this.memberCache.length; i++) {
      let spanElement = document.getElementById(`span${i}`);
      let pElement = document.getElementById(`p${i}`);
      let spanElementHTML = spanElement?.innerText;
      let pElementHTML = pElement?.innerText;
      if (spanElementHTML == undefined) spanElementHTML = '';
      if (pElementHTML == undefined) pElementHTML = '';
      if (pElementHTML && spanElementHTML) pElementHTML = pElementHTML.replace(spanElementHTML, '');
      // this.editSaveArray(i,);
      let name = this.memberCache[i].member;
      let email = this.memberCache[i].email;
      let userId = this.memberCache[i].userId;
      this.saveArray.push({
        span: spanElementHTML,
        p: pElementHTML,
        userId: userId,
        name: name,
        email: email,
      });
    }

    this.memberCache = [{ number: 0, member: '', id: 0, email: 'unset', userId: 'unset' }];
    console.log(this.saveArray);
    this.directChatService.saveMessage2(this.saveArray);
    this.saveArray = [];

  }

  editSaveArray(i):void {
    let name = this.memberCache[i].member;
    let email = this.memberCache[i].email;
    let userId = this.memberCache[i].userId;
  }



}
