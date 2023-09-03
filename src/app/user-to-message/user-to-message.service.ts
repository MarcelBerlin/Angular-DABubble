import { Injectable } from '@angular/core';
import { DirectChatService } from '../direct-chat/services/direct-chat.service';

@Injectable({
  providedIn: 'root'
})
export class UserToMessageService {
  showInfoBox: number = -1;
  saveArray: any = []; // das ist das array wo bei druck auf senden alles gespeichert wird
  memberCache = [{ number: 0, member: '', id: 0, email: 'unset', userId: 'unset' }]; // Zwischenspeicher


  constructor(private directChatService: DirectChatService) { }


  /**
   * Inserts an emoji into the memberCache array.
   *
   * @param {string} emoji - The emoji to be inserted.
   * @returns {void}
   */
  insertEmoji(emoji):void {
    this.memberCache.push({
      number: -1,
      member: emoji,
      id: -1,
      email: 'unset',
      userId: 'unset',
    });
  }


  /**
   * Sends the messages, extracts data from the HTML elements, and resets the memberCache array.
   * 
   * @returns {void}
   */
  send():void {
    for (let i = 0; i < this.memberCache.length; i++) {
      let spanElement = document.getElementById(`span${i}`);
      let pElement = document.getElementById(`p${i}`);
      let spanElementHTML = spanElement?.innerText;
      let pElementHTML = pElement?.innerText;
      if (spanElementHTML == undefined) spanElementHTML = '';
      if (pElementHTML == undefined) pElementHTML = '';
      if (pElementHTML && spanElementHTML) pElementHTML = pElementHTML.replace(spanElementHTML, '');
      this.editSaveArray(i, spanElementHTML, pElementHTML);
    }
    this.memberCache = [{ number: 0, member: '', id: 0, email: 'unset', userId: 'unset' }];
    this.directChatService.saveMessage2(this.saveArray);
    this.saveArray = [];
  }


  /**
   * Edits and saves data from the memberCache into the saveArray.
   *
   * @param {number} i - The index of the memberCache array to process.
   * @param {string} spanElementHTML - The inner text of the span element.
   * @param {string} pElementHTML - The inner text of the p element.
   * @returns {void}
   */
  editSaveArray(i: number, spanElementHTML: string, pElementHTML: string): void {
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



}
