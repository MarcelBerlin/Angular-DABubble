import { Injectable } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Firestore, collection, doc, getDoc } from '@angular/fire/firestore';
import { DirectChatService } from './direct-chat.service';
@Injectable({
  providedIn: 'root'
})
export class NewMessageAmountService {
  newMessagesPartnerIndex: number[] = [];
  messageAmountArray: any[] = [];


  constructor(
    private dataService: DataService,
    private directChatService: DirectChatService,
    private firestore: Firestore
  ) {
    this.subcribeUserData();
  }


  /**
   * Subscribes to changes in user data and triggers the check for new messages.
   * 
   * @returns {void}
   */
  subcribeUserData(): void {
    this.dataService.users$.subscribe((user: any) => {
      this.checkForNewMessages();
    });
  }


  /**
   * Checks for new messages in the user's direct chats and calculates message counts.
   * 
   * @returns {void}
   */
  checkForNewMessages(): void {
      this.newMessagesPartnerIndex = [];
      this.messageAmountArray = [];
      let ownDirectChats: any[] = this.dataService.loggedInUserData.directChats;
      ownDirectChats.forEach(element => {
        let directChatId: string = element.directChatId;
        let ownDateTimeNumber: number = element.lastTimeStamp.dateTimeNumber;
        let pId: string = element.partnerId;
        let i: number = 0;
        this.newMessagePartnerIndex(pId, directChatId, ownDateTimeNumber, i);
        i++;
      });
  }


  /**
   * Calculates new message partner indexes and message amounts based on comparison of timestamps.
   * 
   * @param {string} pId - The partner's user ID.
   * @param {string} directChatId - The ID of the direct chat.
   * @param {number} ownDateTimeNumber - The timestamp of the user's own last message.
   * @param {number} i - The index used for tracking in the loop.
   * @returns {void}
 */
  newMessagePartnerIndex(pId: string, directChatId: string, ownDateTimeNumber: number, i: number):void {
    this.dataService.userData.forEach(user => {
      if (user.userId == pId) {
        let pDirectChats = user.directChats;
        pDirectChats.forEach(chat => {
          if (chat.directChatId === directChatId) {
            if (chat.lastTimeStamp.dateTimeNumber > ownDateTimeNumber) {
              this.newMessagesPartnerIndex.push(i);
              this.getMessageAmount(directChatId, ownDateTimeNumber, i);
            }
          }
        });
      }
      i++;
    });
  }


  /**
   * Calculates the amount of new messages in a direct chat based on timestamps.
   * 
   * @param {string} directChatId - The ID of the direct chat.
   * @param {number} ownDateTimeNumber - The timestamp of the user's own last message.
   * @param {number} index - The index used for tracking in the loop.
   * @returns {void}
   */
  getMessageAmount(directChatId: string, ownDateTimeNumber: number, index: number):void {
    let amount: number = 0;
    const coll = collection(this.firestore, 'directChats');
    const qData = doc(coll, directChatId);
    let foundChat: any = [];
    getDoc(qData).then((chatDataSet) => {
      foundChat = chatDataSet.data();
      foundChat.chat.forEach(element => {
        if (element.dateTimeNumber > ownDateTimeNumber) amount += 1;
      });
      let pushElement = { user: index, amount: amount };
      if (!this.messageAmountArray.includes({ user: index, amount: amount })){
        this.messageAmountArray.push(pushElement);
      }
    }).catch((error) => {
      console.log('Fehler beim Abrufen des Dokuments:');
    });
  }


  /**
   * Calculates the amount of new messages in a direct chat based on timestamps.
   * 
   * @param {string} directChatId - The ID of the direct chat.
   * @param {number} ownDateTimeNumber - The timestamp of the user's own last message.
   * @param {number} index - The index used for tracking in the loop.
   * 
   * @returns {void}
   */
  setLastMessageTimeStamp():void {
    let actualChatId = this.directChatService.directChat.id;
    for (let i = 0; i < this.dataService.loggedInUserData.directChats.length; i++) {
      let directChatId = this.dataService.loggedInUserData.directChats[i].directChatId;
      if (directChatId === actualChatId) {
        this.dataService.loggedInUserData.directChats[i].lastTimeStamp = this.createLastMessageTimeStamp();
      }
    }
    this.dataService.updateUser();
  }


  /**
   * Creates an object containing the timestamp information of the last message in the direct chat.
   * 
   * @returns {Object} An object with properties for the date, time, and lastDateTimeNumber of the last message.
   */
  createLastMessageTimeStamp(): { date: string, time: string, lastDateTimeNumber: number } {
    let directChatLength = this.directChatService.directChat.chat.length;
    let lastChatDate: string = this.directChatService.directChat.chat[directChatLength - 1].date;
    let lastChatTime: string = this.directChatService.directChat.chat[directChatLength - 1].time;
    let lastDateTimeNumber: number = this.directChatService.directChat.chat[directChatLength - 1].dateTimeNumber;
    return { date: lastChatDate, time: lastChatTime, lastDateTimeNumber: lastDateTimeNumber };
  }
}
