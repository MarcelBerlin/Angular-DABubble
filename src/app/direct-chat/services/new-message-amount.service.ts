import { Injectable } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Firestore, collection, doc, getDoc } from '@angular/fire/firestore';
import { DirectChatService } from './direct-chat.service';
@Injectable({
  providedIn: 'root'
})
export class NewMessageAmountService {
  actualPartnerUserDataIndex: number;
  bagesArray = [];


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
    this.dataService.users$.subscribe(() => {
      this.createDirectChatBadges();
    });
  }


  addPartnerDirectChatMessageAmount(): void {
    let directChatId = this.directChatService.directChat.id;
    let partnerDirectChats = this.dataService.userData[this.actualPartnerUserDataIndex].directChats;
    for (let index = 0; index < partnerDirectChats.length; index++) {
      if (partnerDirectChats[index].directChatId == directChatId) {
        partnerDirectChats[index].newMessageAmount += 1;
        this.directChatService.updateOtherUser(this.actualPartnerUserDataIndex);
      }
    }
    this.setOwnMessageAmountToZero();
  }


  setOwnMessageAmountToZero(): void {
    let directChatId = this.directChatService.directChat.id;
    for (let index = 0; index < this.dataService.loggedInUserData.directChats.length; index++) {
      if (this.dataService.loggedInUserData.directChats[index].directChatId == directChatId) {
        this.dataService.loggedInUserData.directChats[index].newMessageAmount = 0;
        this.dataService.updateUser();
      }
    }
  }


  createDirectChatBadges(): void {
    this.bagesArray = [];
    for (let i = 0; i < this.dataService.userData.length; i++) {
      this.dataService.loggedInUserData.directChats.forEach(directChat => {
        if (directChat.partnerId == this.dataService.userData[i].userId) {
          this.bagesArray[i] = directChat.newMessageAmount;
        } else if (this.bagesArray[i] == undefined) {
          this.bagesArray[i] = 0;
        }
      });
    }
  }
}
