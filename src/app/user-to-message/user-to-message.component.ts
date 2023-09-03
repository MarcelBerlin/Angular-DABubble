import { Component, ViewChild, ElementRef } from '@angular/core';
import { DataService } from '../services/data.service';
import { VariablesService } from '../services/variables.service';
import { UserToMessageService } from './user-to-message.service';
import { DirectChatService } from '../direct-chat/services/direct-chat.service';

@Component({
  selector: 'app-user-to-message',
  templateUrl: './user-to-message.component.html',
  styleUrls: ['./user-to-message.component.scss'],
})
  
export class UserToMessageComponent {
  // @ViewChild('editableDiv') editableDiv!: ElementRef;

  // memberCache = [{ number: 0, member: '', id: 0 }]; // Zwischenspeicher

  selectedUserIndex!: number;
  invisibleSign: string = '\u200B'; // verstecktes Zeichen
  // showInfoBox: number = -1;
  // saveArray: any = []; // das ist das array wo bei druck auf senden alles gespeichert wird

  constructor(
    public dataService: DataService,
    public varService: VariablesService,
    public userToMessageService: UserToMessageService,
    private directChatService: DirectChatService
  ) {}

  showInfoInput = (index: number) => (this.userToMessageService.showInfoBox = index);
  hideInfoInput = () => (this.userToMessageService.showInfoBox = -1);
  // calculateIndexInput = (): number => (this.memberCache[this.userToMessageService.showInfoBox].id);
  // edit by Bossi
  calculateIndexInput = (): number => (this.userToMessageService.memberCache[this.userToMessageService.showInfoBox].id);
  
  // showInfoOutput =(index: number) => (this.showInfoBox = index);
  // hideInfoOutput = () => (this.showInfoBox = -1);
  // calculateIndexOutput = (): number => (this.saveArray[this.showInfoBox].userId);

  // mit click auf den user wird der selectedUser in den Zwischenspeicher gespeichert
  selectedUser(index: number) {
    // this.selectedUserIndex = index;
    // this.memberCache.push({
    //   number: this.memberCache.length,
    //   member: this.dataService.userData[index].name,
    //   id: index,
    // });
    // edit by Bossi
    this.userToMessageService.memberCache.push({
      number: this.userToMessageService.memberCache.length,
      member: this.dataService.userData[index].name,
      id: index,
      email: this.dataService.userData[index].email,
      userId: this.dataService.userData[index].userId,
    });
    this.varService.setVar('sign', false);
  }


  

  send() {
  //   for (let i = 0; i < this.memberCache.length; i++) {
  //     let spanElement = document.getElementById(`span${i}`);
  //     let pElement = document.getElementById(`p${i}`);

  //     let spanElementHTML = spanElement?.innerText;
  //     let pElementHTML = pElement?.innerText;

  //     if (pElementHTML && spanElementHTML) {
  //       pElementHTML = pElementHTML.replace(spanElementHTML, '');
  //     }

  //     this.userToMessageService.saveArray.push({
  //       span: spanElementHTML,
  //       p: pElementHTML,
  //       userId: this.memberCache[i].id,
  //     });
  //   }
  //   this.memberCache = [{ number: 0, member: '', id: 0 }];
  //   console.log(this.userToMessageService.saveArray);
  // }

  //edit by Bossi
  for (let i = 0; i < this.userToMessageService.memberCache.length; i++) {
    let spanElement = document.getElementById(`span${i}`);
    let pElement = document.getElementById(`p${i}`);
    let spanElementHTML = spanElement?.innerText;
    let pElementHTML = pElement?.innerText;
    if(spanElementHTML == undefined) spanElementHTML = '';
    if(pElementHTML == undefined) pElementHTML = '';
    if (pElementHTML && spanElementHTML) {
      pElementHTML = pElementHTML.replace(spanElementHTML, '');
    }
    let name = this.userToMessageService.memberCache[i].member;
    let email = this.userToMessageService.memberCache[i].email;
    let userId = this.userToMessageService.memberCache[i].userId;
    this.userToMessageService.saveArray.push({
      span: spanElementHTML,
      p: pElementHTML,
      // userId: this.userToMessageService.memberCache[i].id,
      userId: userId,
      name: name,
      email: email,
    });
  }

  this.userToMessageService.memberCache = [{ number: 0, member: '', id: 0, email: 'unset', userId: 'unset' }];
  console.log(this.userToMessageService.saveArray);
  // setTimeout(() => {
    this.directChatService.saveMessage2(this.userToMessageService.saveArray);
    this.userToMessageService.saveArray = [];
  // }, 5000);
  
}
}
