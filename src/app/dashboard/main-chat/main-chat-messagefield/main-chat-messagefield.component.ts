import { Component, ElementRef, ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { VariablesService } from 'src/app/services/variables.service';
import { DialogAddService } from 'src/app/services/dialog-add.service';
import { MessageService } from 'src/app/services/messages.service';
import { ChatService } from 'src/app/services/chat.service';
import { DirectChatService } from 'src/app/direct-chat/services/direct-chat.service';
import { EmojiPickerBossiService } from 'src/app/emoji-picker-bossi/services/emoji-picker-bossi.service';
import { AddUserToMessageService } from 'src/app/services/add-user-to-message.service';
import { MatDialog } from '@angular/material/dialog';
import { NewMessageAmountService } from 'src/app/direct-chat/services/new-message-amount.service';
import { FileUploadService } from 'src/app/file-upload/services/file-upload.service';
import { UploadService } from 'src/app/file-upload/services/upload.service';
import { MessageInputServiceService } from 'src/app/message-input/service/message-input-service.service';


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
    public fileUploadService: FileUploadService,
    public uploadService: UploadService,
    private messageInputService: MessageInputServiceService

  ) {
    this.detectEnterButton();
   }


  /**
 * Checks if the currently logged-in user matches the selected user to message.
 *
 * @returns {boolean} Returns `true` if the currently logged-in user matches the selected user to message, otherwise `false`.
 *
 */
  currentUser() {
    return (
      this.dataService.loggedInUserData.email ===
      this.dataService.userData[this.varService.selectedUserToMessage].email
    );
  }


  /**
 * Initiates the process of sending a chat message.
 *
 * @returns {void}
 *
 */
  send(): void {
    this.onChatTextChanged();
    this.messageSend();
  }


  /**
 * Updates the chatService's emptyChat property based on the current chat context.
 *
 * @method
 * @returns {void}
 *
 */
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


/**
 * Sends a chat message based on the current chat context and input conditions.
 *
 * @method
 * @returns {void}
 *
 */
  messageSend(): void {
    if (this.varService.mainChatHead == 0 && this.messageInputService.sendButtonEnabled && !this.messageInputService.placeholerView) {
      this.triggerMessageSave();
    }else this.messageInputService.setMyVariable(true);
    if (this.varService.mainChatHead === 1 && this.directChatService.directChatActive && !this.currentUser()) {
      if (this.messageInputService.sendButtonEnabled && !this.messageInputService.placeholerView) {
        this.newMessageAmountService.addPartnerDirectChatMessageAmount();
        this.triggerMessageSave();
      } else this.messageInputService.setMyVariable(true);
    }
    if (this.varService.mainChatHead === 1 && this.directChatService.directChatActive && this.currentUser()) {
      if (this.messageInputService.sendButtonEnabled && !this.messageInputService.placeholerView) {
        this.triggerMessageSave();
      } else this.messageInputService.setMyVariable(true);
    }
  }


  /**
   * Triggers the process to save a message by resetting variables,
   * setting specific variables, and disabling the send button.
   * It's designed to initiate the message saving process.
   * 
   * @returns {void}
   */
  triggerMessageSave(): void {
    this.messageInputService.resetVariables();
    this.messageInputService.setMyVariable(true);
    this.messageInputService.sendButtonEnabled = false;
  }



  /**
 * Toggles the value of the 'sign' property in the varService.
 *
 * @returns {void}
 *
 */
  addSign():void {
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
    this.fileUploadService.basePath = '/uploads/' + this.dataService.loggedInUserData.userId + '/files/' + today.getTime().toString();
    this.fileInput.nativeElement.click();
  }


  /**
   * Listens for the 'keyup' event on the window and triggers the 'send' method
   * if the Enter key is pressed and the send button is enabled.
   * 
   * @returns {void}
   */
  detectEnterButton(): void {
    window.addEventListener('keyup', (e) => {
      if (e.keyCode == 13 && !this.messageInputService.placeholerView) {
        this.messageInputService.enterButtonPressed = true;
        this.send();
      }
  })
  }
}