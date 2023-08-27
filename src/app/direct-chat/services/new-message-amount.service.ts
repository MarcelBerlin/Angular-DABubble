import { Injectable } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Firestore, collectionData, collection, setDoc, doc, updateDoc, deleteDoc, addDoc, getDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class NewMessageAmountService {

  constructor(
    private dataService: DataService,
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
  }
}
