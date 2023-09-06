import { Component, ElementRef, ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { VariablesService } from 'src/app/services/variables.service';
import { DashboardComponentsShowHideService } from '../../dashboard-components-show-hide.service';
import { DialogAddService } from 'src/app/services/dialog-add.service';
import { MessageService } from 'src/app/services/messages.service';
import { ChatService } from 'src/app/services/chat.service';
import { DirectChatService } from 'src/app/direct-chat/services/direct-chat.service';
import { EmojiPickerBossiService } from 'src/app/emoji-picker-bossi/services/emoji-picker-bossi.service';
import { AddUserToMessageService } from 'src/app/services/add-user-to-message.service';
import { MatDialog } from '@angular/material/dialog';
import { NewMessageAmountService } from 'src/app/direct-chat/services/new-message-amount.service';
import { UserToMessageService } from 'src/app/user-to-message/user-to-message.service';
import { FileUploadService } from 'src/app/file-upload/services/file-upload.service';
import { UploadService } from 'src/app/file-upload/services/upload.service';


@Component({
  selector: 'app-main-chat-messagefield',
  templateUrl: './main-chat-messagefield.component.html',
  styleUrls: ['./main-chat-messagefield.component.scss'],
})
export class MainChatMessagefieldComponent {
  specificChannel: string = '';
  directMessage: string = '';
  loggedUser: string = '';
  searchField: string = '';
  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(
    public varService: VariablesService,
    public dataService: DataService,
    public dialogAddService: DialogAddService,
    public messageService: MessageService,
    public chatService: ChatService,
    public directChatService: DirectChatService,
    public emojiService: EmojiPickerBossiService,
    public addUserToMessageService: AddUserToMessageService,
    public dialog: MatDialog,
    private newMessageAmountService: NewMessageAmountService,
    private userToMessageService: UserToMessageService,
    public fileUploadService: FileUploadService,
    public uploadService: UploadService,
  ) { }

  currentUser() {
    return (
      this.dataService.loggedInUserData.email ===
      this.dataService.userData[this.varService.selectedUserToMessage].email
    );
    
  }

  send() {
    this.onChatTextChanged();
    this.messageSend();
  }

  onChatTextChanged() {
    this.chatService.emptyChat = (
      this.varService.mainChatHead === 0 && this.specificChannel.trim() === ''
    ) || (
        this.varService.mainChatHead === 1 && this.currentUser() && this.loggedUser.trim() === ''
      ) || (
        this.varService.mainChatHead === 1 && !this.currentUser() && this.directMessage.trim() === ''
      ) || (
        this.varService.mainChatHead === 2 && this.searchField.trim() === ''
      );
  }

  messageSend() {
    if (this.varService.mainChatHead == 0 && this.messageService.messageText.length >= 1) {
      this.messageService.addMessage();   
      this.messageService.messageText = '';
    }
    // add by Bossi for directChatService
    if (this.varService.mainChatHead === 1 && this.directChatService.directChatActive && !this.currentUser()) {
      this.directChatService.saveMessage();
      this.newMessageAmountService.addPartnerDirectChatMessageAmount();
    }
    if (this.varService.mainChatHead === 1 && this.directChatService.directChatActive && this.currentUser() ){
      this.userToMessageService.send();
    }
  }

  addSign() {
    this.varService.sign = !this.varService.sign;
  }


  /**
   * Opens the file explorer dialog for uploading a file.
   * Sets the profile image upload flag to false and set base path for storage.
   * 
   * @returns {void}
   */
  openFileExplorer(): void {
    let today: Date = new Date();
    this.fileUploadService.profileImgUpload = false;
    this.fileUploadService.basePath ='/uploads/' + this.dataService.loggedInUserData.userId + '/files/' + today.getTime().toString();
    this.fileInput.nativeElement.click();
  }
}

