import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserToMessageService {
  showInfoBox: number = -1;
  saveArray: any = []; // das ist das array wo bei druck auf senden alles gespeichert wird
  // edit by Bossi
  memberCache = [{ number: 0, member: '', id: 0 }]; // Zwischenspeicher


  constructor() { }


  // edit by Bossi
  insertEmoji(emoji){
    this.memberCache.push({
      number: -1,
      member: emoji,
      id: undefined,
    });
  }



}
