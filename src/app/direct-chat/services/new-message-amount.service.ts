import { Injectable } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Firestore, collectionData, collection, setDoc, doc, updateDoc, deleteDoc, addDoc, getDoc } from '@angular/fire/firestore';
import { DirectChatService } from './direct-chat.service';
@Injectable({
  providedIn: 'root'
})
export class NewMessageAmountService {

  constructor(
    private dataService: DataService,
    private directChatService: DirectChatService,
    private firestore: Firestore
    ) { }


  newMessagesPartnerIndex: number[] = [];
  messageAmountArray: any[] = [];


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

  newMessagePartnerIndex(pId: string, directChatId: string, ownDateTimeNumber: number, i: number){
    this.dataService.userData.forEach(user  => {
      if(user.userId == pId) {
        let pDirectChats = user.directChats;
        pDirectChats.forEach(chat => {
          if(chat.directChatId === directChatId) {
            if(chat.lastTimeStamp.dateTimeNumber > ownDateTimeNumber){
              this.newMessagesPartnerIndex.push(i);
              this.getMessageAmount(directChatId, ownDateTimeNumber, i);
            } 
          }
        });
      }
      i++;
    });
  }


  getMessageAmount(directChatId: string, ownDateTimeNumber: number, index: number){
    let amount:number = 0;
    const coll = collection(this.firestore, 'directChats');
    const qData = doc(coll, directChatId);
    let foundChat: any = [];
    getDoc(qData).then((chatDataSet) => {
      foundChat = chatDataSet.data();
      foundChat.chat.forEach(element => {
        if(element.dateTimeNumber > ownDateTimeNumber ) amount += 1;
      });
      let pushElement = {user: index, amount: amount};
      this.messageAmountArray.push(pushElement);
    }).catch((error) => 
    {console.log('Fehler beim Abrufen des Dokuments:');
    });
    console.log(this.newMessagesPartnerIndex,  this.messageAmountArray );
  }



  setLastMessageTimeStamp(){
    // get partner timestamp
    console.log(this.dataService.loggedInUserData.directChats);
    let directChatLength = this.directChatService.directChat.chat.length;
    let lastChatDate = this.directChatService.directChat.chat[directChatLength - 1].date;
    let lastChatTime = this.directChatService.directChat.chat[directChatLength - 1].time;
    let lastDateTimeNumber = this.directChatService.directChat.chat[directChatLength - 1].dateTimeNumber;
    let lastTimeStamp = {date: lastChatDate, time: lastChatTime, lastDateTimeNumber: lastDateTimeNumber};
    let actualChatId = this.directChatService.directChat.id;
    for (let i = 0;i < this.dataService.loggedInUserData.directChats.length; i++) {
      let directChatId = this.dataService.loggedInUserData.directChats[i].directChatId;
      if (directChatId === actualChatId) {
        this.dataService.loggedInUserData.directChats[i].lastTimeStamp = lastTimeStamp;
      }
    }
    // loggedInUserData werden zum Update genutzt.
    console.log(this.dataService.loggedInUserData.directChats, lastTimeStamp);
    this.dataService.updateUser();
  }
}
