import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ChatService } from 'src/app/services/chat.service';
import { DataService } from 'src/app/services/data.service';
import { DialogAddService } from 'src/app/services/dialog-add.service';
import { MessageService } from 'src/app/services/messages.service';
import { VariablesService } from 'src/app/services/variables.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SecondaryChatAnswerService } from '../service/secondary-chat-answer.service';
import { DirectChatService } from 'src/app/direct-chat/services/direct-chat.service';
import { EmojiPickerBossiService } from 'src/app/emoji-picker-bossi/services/emoji-picker-bossi.service';
import { AddUserToMessageService } from 'src/app/services/add-user-to-message.service';
import { MatDialog } from '@angular/material/dialog';
import { NewMessageAmountService } from 'src/app/direct-chat/services/new-message-amount.service';
import { FileUploadService } from 'src/app/file-upload/services/file-upload.service';
import { UploadService } from 'src/app/file-upload/services/upload.service';
import { MessageInputServiceService } from 'src/app/message-input/service/message-input-service.service';
import { MessageInputThreadService } from 'src/app/message-input-thread/service/message-input-thread.service';

@Component({
  selector: 'app-secondary-chat-inputfield',
  templateUrl: './secondary-chat-inputfield.component.html',
  styleUrls: ['./secondary-chat-inputfield.component.scss'],
})
export class SecondaryChatInputfieldComponent {
  @ViewChild('uploadInput') uploadInput: ElementRef<HTMLInputElement>;

  textarea: any = '';
  showUsers: boolean = true;
  formcontrol = new FormControl('');
  userValue: string = '';
  inputValue = this.answerService.answerText;
  markedUser: string = '';
  users =
    this.dialogAddService.tagsData[this.varService.selectedChannel].members;
  directMessage: string = '';
  loggedUser: string = '';
  searchField: string = '';

  constructor(
    public varService: VariablesService,
    public dataService: DataService,
    public dialogAddService: DialogAddService,
    public messageService: MessageService,
    public chatService: ChatService,
    public answerService: SecondaryChatAnswerService,

    // public varService: VariablesService,
    // public dataService: DataService,
    // public dialogAddService: DialogAddService,
    // public messageService: MessageService,
    // public chatService: ChatService,
    public directChatService: DirectChatService,
    public emojiService: EmojiPickerBossiService,
    public addUserToMessageService: AddUserToMessageService,
    public dialog: MatDialog,
    private newMessageAmountService: NewMessageAmountService,
    public fileUploadService: FileUploadService,
    public uploadService: UploadService,
    private messageInputService: MessageInputThreadService
  ) {}

  /**
   * Toggles the visibility of the user autocomplete feature.
   * Sets inputValue to '@' + userValue and highlights usernames if the feature is shown.
   * Clears inputValue if userValue is empty.
   *
   * @function showAutocomplete
   * @returns {void}
   */
  showAutocomplete() {
    this.showUsers = !this.showUsers;
    this.inputValue = '@' + this.userValue;

    if (this.showUsers) {
      this.highlightUsers();
    }
    if (this.userValue == '') {
      this.inputValue = '';
    }
  }

  /**
   * Highlights usernames within the inputValue and assigns the result to the markedUser property.
   * Calls the highlightUsernames method to process and highlight usernames within the inputValue.
   *
   * @function highlightUsers
   * @returns {void}
   */
  highlightUsers() {
    // beim absenden mit einbauen?
    const message = this.inputValue;
    this.markedUser = this.highlightUsernames(message);
  }

  /**
   * Highlights usernames within a given message by replacing them with HTML span elements.
   * Iterates through the usernames and replaces them with spans having a 'highlight' class.
   *
   * @function highlightUsernames
   * @param {string} message - The message containing usernames to be highlighted.
   * @returns {string} - The message with highlighted usernames using HTML span elements.
   */
  highlightUsernames(message: string) {
    for (const user of this.users) {
      const highlight = new RegExp(`@${user}\\b`, 'g'); // Wortgrenze + globaler Suchmodus
      message = message.replace(
        highlight,
        `<span class="highlight">${user}</span>`
      );
    }
    console.log('marked user should be', message);
    return message;
  }

  /**
   * Triggers a click event on the native file input element.
   *
   * @function triggerInput
   * @returns {void}
   */
  triggerInput() {
    this.uploadInput.nativeElement.click();
  }

  /**
   * Retrieves input data from an event containing a file.
   * Reads the file content and sets it to the textarea property.
   * Logs the file type and content to the console.
   *
   * @function getInputDatas
   * @param {Event} event - The event object containing file data.
   * @returns {void}
   */
  getInputDatas(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      console.log(file.type);
      const reader: FileReader = new FileReader();
      reader.onload = (e: any) => {
        this.textarea = e.target.result;
        console.log(e.target.result);
      };
      reader.readAsDataURL(file);
      // console.log(file);
    }
  }

  /**
   * Marks a user by setting the textarea value with the user's name or tag.
   * Currently commented out.
   *
   * @function markUser
   * @returns {void}
   */
  markUser() {
    // this.textarea = '@'+ this.dataService.userData[this.varService.selectedChannel].name;
  }

  // Bossi#####################################

  @ViewChild('fileInputThread') fileInputThread!: ElementRef;
  currentUser() {
    return (
      this.dataService.loggedInUserData.email ===
      this.dataService.userData[this.varService.selectedUserToMessage].email
    );
  }

  /**
   * Prepares to send a message by resetting variables and setting specific flags.
   *
   * @function send
   * @returns {void}
   */
  send() {
    // this.messageSend();
    this.messageInputService.resetVariables();
    this.messageInputService.setMyVariable(true);
  }

  messageSend() {
    // if (this.varService.mainChatHead == 0 && this.messageService.messageText.length >= 1) {
    //   this.messageService.addMessage();
    //   this.messageService.messageText = '';
    // }
    if (
      this.varService.mainChatHead == 0 &&
      this.messageInputService.sendButtonEnabled &&
      !this.messageInputService.placeholerView
    ) {
      this.messageInputService.resetVariables();
      this.messageInputService.setMyVariable(true);
      this.messageInputService.sendButtonEnabled = false;
    }

    // add by Bossi for directChatService
    if (
      this.varService.mainChatHead === 1 &&
      this.directChatService.directChatActive &&
      !this.currentUser()
    ) {
      if (
        this.messageInputService.sendButtonEnabled &&
        !this.messageInputService.placeholerView
      ) {
        this.messageInputService.resetVariables();
        this.messageInputService.setMyVariable(true);
        this.newMessageAmountService.addPartnerDirectChatMessageAmount();
        this.messageInputService.sendButtonEnabled = false;
      }
    }
    if (
      this.varService.mainChatHead === 1 &&
      this.directChatService.directChatActive &&
      this.currentUser()
    ) {
      if (
        this.messageInputService.sendButtonEnabled &&
        !this.messageInputService.placeholerView
      ) {
        this.messageInputService.resetVariables();
        this.messageInputService.setMyVariable(true);
        this.messageInputService.sendButtonEnabled = false;
      }
    }
  }

  /**
   * Toggles the signThread variable to add or remove a sign.
   *
   * @function addSign
   * @returns {void}
   */
  addSign() {
    this.varService.signThread = !this.varService.signThread;
  }

  /**
   * Opens the file explorer dialog for uploading a file.
   * Sets the profile image upload flag to false and set base path for storage.
   *
   * @returns {void}
   */
  openFileExplorer(): void {
    this.fileUploadService.threadUpload = true;
    let today: Date = new Date();
    this.fileUploadService.profileImgUpload = false;
    this.fileUploadService.basePath =
      '/uploads/' +
      this.dataService.loggedInUserData.userId +
      '/files/' +
      today.getTime().toString();
    this.fileInputThread.nativeElement.click();
  }
}
