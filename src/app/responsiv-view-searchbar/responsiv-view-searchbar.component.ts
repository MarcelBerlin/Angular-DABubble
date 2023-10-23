import { Component} from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import {FormControl, FormGroup, Validators,} from '@angular/forms';
import { DialogAddService } from 'src/app/services/dialog-add.service';
import { VariablesService } from 'src/app/services/variables.service';
import { ConditionService } from 'src/app/services/condition.service';
import { DashboardComponentsShowHideService } from '../dashboard/dashboard-components-show-hide.service';
import { MessageService } from '../services/messages.service';
import { MessageInputServiceService } from '../message-input/service/message-input-service.service';
import { DirectChatService } from '../direct-chat/services/direct-chat.service';
import { NewMessageAmountService } from '../direct-chat/services/new-message-amount.service';
@Component({
  selector: 'app-responsiv-view-searchbar',
  templateUrl: './responsiv-view-searchbar.component.html',
  styleUrls: ['./responsiv-view-searchbar.component.scss']
})
export class ResponsivViewSearchbarComponent {
  emailArray: any[] = [];
  nameArray: any[] = [];
  findingsArray: any[] = [];
  channelArray: any[] = [];
  emailSearch: boolean = false;
  termSearch: boolean = false;
  channelSearch: boolean = false;
  

  constructor(
    public varService: VariablesService,
    public dataService: DataService,
    private dialogAddService: DialogAddService,
    public conditionService: ConditionService,
    private dcshService: DashboardComponentsShowHideService,
    private messageService: MessageService,
    private messageInputService: MessageInputServiceService,
    private directChatService: DirectChatService,
    private newMessageAmountService: NewMessageAmountService
  ) {
  }


  responsiveSearchBar = new FormGroup({
    searchTerm: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}.?[a-zA-Z]{0,2}',),
      Validators.minLength(8),])
  });


  getSearchValue() {
    this.resetFindingsArrays();
    this.resetSearchCategory();
    const enteredStringTrimmed = this.getTrimmedLowerCaseSearchTerm();
    this.createFindingsArraysInUserData(enteredStringTrimmed);
    this.createFindingsArrayChannels(enteredStringTrimmed);
    console.log(this.nameArray, this.emailArray, this.channelArray);
    this.createFindingsArray();
  }


  resetFindingsArrays(): void {
    this.emailArray = [];
    this.findingsArray = [];
    this.nameArray = [];
    this.channelArray = [];
  }


  resetSearchCategory(): void {
    this.emailSearch = false;
    this.termSearch = false;
    this.channelSearch = false;
  }


  createFindingsArraysInUserData(enteredStringTrimmed: string): void {
    let index = 0;
    this.dataService.userData.forEach(data => {
      let emailLowerCase = data.email.toLowerCase();
      let nameLowerCase = data.name.toLowerCase();
      if (this.nameFound(nameLowerCase, enteredStringTrimmed) && !this.emailSearch && !this.channelSearch) {
        this.nameArray.push({ term: data.name, index: index, type: 'name'});
      }
      if (this.emailFound(emailLowerCase, enteredStringTrimmed) && !this.channelSearch) {
        this.emailArray.push({ term: data.email, index: index, type: 'email'});
      }
      index++;
    });
  }


  createFindingsArrayChannels(enteredStringTrimmed: string): void {
    let index = 0;
    this.dialogAddService.tagsData.forEach((channel) => {
      let channelNameLowerCase = channel.name.toLowerCase();
      if (this.channelFound(channelNameLowerCase, enteredStringTrimmed) && !this.emailSearch){
        this.channelArray.push({ term: channel.name, index: index, type: 'channel' });
      }
      index++;
    });
  }


  getTrimmedLowerCaseSearchTerm(): string {
    const enteredString = this.responsiveSearchBar.value.searchTerm;
    this.responsiveSearchBar.get('searchTerm').setValue(enteredString.trim());
    let enteredStringTrimmed = this.responsiveSearchBar.value.searchTerm.toLocaleLowerCase();
    if (enteredStringTrimmed[0] == '@') {
      enteredStringTrimmed = enteredStringTrimmed.substring(1);
      console.log('emailsearch', enteredStringTrimmed);
      this.emailSearch = true;
    } else if (enteredStringTrimmed[0] == '#') {
      enteredStringTrimmed = enteredStringTrimmed.substring(1);
      this.channelSearch = true;
      console.log('channelsearch', enteredStringTrimmed);
    } else if (enteredStringTrimmed.length > 0){
      this.termSearch = true;
      console.log('termsearch');
    } 
    return enteredStringTrimmed;
  }


  nameFound(nameLowerCase: string, enteredStringTrimmed: string): boolean {
    return nameLowerCase.includes(enteredStringTrimmed);
  }


  emailFound(emailLowerCase: string, enteredStringTrimmed: string): boolean {
    return emailLowerCase.includes(enteredStringTrimmed);
  }


  channelFound(channelNameLowerCase: string, enteredStringTrimmed: string): boolean {
    return channelNameLowerCase.includes(enteredStringTrimmed);
  }


  findIndexInArray(array: string[], searchValue: string): number {
    return array.findIndex(item => item === searchValue);
  }

  createFindingsArray(): void {
    this.nameArray.forEach(name => {
      this.findingsArray.push(name);
    });
    this.emailArray.forEach(email => {
      this.findingsArray.push(email);
    });
    this.channelArray.forEach(channel => {
      this.findingsArray.push(channel);
    });
  }






  openApplicableChat(index: number, type: string): void {
    if (type == 'channel') this.openChannel(index);
    else this.messageToUser(index);
  }


  async openChannel(arrayId: number) {
    this.varService.setVar('mainChatHead', 0);
    this.varService.setVar('selectedChannel', arrayId);
    this.dialogAddService.channelIndex = arrayId;
    // this.dcshService.chatSlideOut();
    const selectedChannel = this.dialogAddService.tags[arrayId];
    const channelId = selectedChannel.id;    
    if (innerWidth <= 800) this.dcshService.hideNavigation = true;  
    await this.messageService.onChannelClick(channelId);
  }

  messageToUser(arrayId: number) {
    this.currentUser()
      ? this.sendMessageToLoggedUser(arrayId)
      : this.sendMessageToSpecificUser(arrayId);
    this.varService.previousScrollTop = 0; // important for the autoscroll functionality
    this.getDirectChatData(arrayId);
  }


  sendMessageToLoggedUser(arrayId: number) {
    this.varService.setVar('mainChatHead', 1);
    this.varService.setVar('selectedUserToMessage', arrayId);
    // this.dcshService.chatSlideOut();
    // if (innerWidth <= 800){
    //   this.dcshService.hideNavigation = true;
    // }   
  }

  sendMessageToSpecificUser(arrayId: number) {
    this.varService.setVar('mainChatHead', 1);
    this.varService.setVar('selectedUserToMessage', arrayId);
    // this.dcshService.chatSlideOut();
    // if (innerWidth <= 800){
    //   this.dcshService.hideNavigation = true;
    // }   
  }


  currentUser() {
    return (
      this.dataService.loggedInUserData.email ===
      this.dataService.userData[this.varService.selectedUserToMessage].email
    );
  }


  getDirectChatData(arrayId: number): void {
    if (this.directChatService.directChatActive) {
      this.messageInputService.chatChange = true;
      const clickedUserId: string = this.dataService.userData[arrayId].id;
      const clickedUserName: string = this.dataService.userData[arrayId].name;
      this.messageInputService.placeholderUserName = clickedUserName; 
      this.messageInputService.placeholderText = 'Nachricht an ' + clickedUserName;
      this.directChatService.getChatId(clickedUserId);
      this.newMessageAmountService.actualPartnerUserDataIndex = arrayId;
      this.messageInputService.setMyVariable(true);
      setTimeout(() => {
        this.newMessageAmountService.setOwnMessageAmountToZero();
      }, 1000);
    }
  }


}
