import { Injectable } from '@angular/core';
import { DataService } from '../../services/data.service';
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


  /**
   * Increments the new message amount for the partner's direct chat and updates the other user's data.
   * 
   * @returns {void}
   */
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


  /**
   * Sets the new message amount for the current user's direct chat to zero and updates the user's data.
   * 
   * @returns {void}
   */
  setOwnMessageAmountToZero(): void {
    let directChatId = this.directChatService.directChat.id;
    for (let index = 0; index < this.dataService.loggedInUserData.directChats.length; index++) {
      if (this.dataService.loggedInUserData.directChats[index].directChatId == directChatId) {
        this.dataService.loggedInUserData.directChats[index].newMessageAmount = 0;
        this.dataService.updateUser();
      }
    }
  }


  /**
   * Creates an array of badges representing the new message amounts for each user's direct chats.
   * 
   * @returns {void}
   */
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
