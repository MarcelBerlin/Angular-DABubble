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

@Component({
  selector: 'app-secondary-chat-inputfield',
  templateUrl: './secondary-chat-inputfield.component.html',
  styleUrls: ['./secondary-chat-inputfield.component.scss']
})
export class SecondaryChatInputfieldComponent {

  @ViewChild('uploadInput') uploadInput: ElementRef<HTMLInputElement>;

  textarea: any = '';
  showUsers: boolean = true;
  formcontrol = new FormControl('');
  userValue: string = '';
  inputValue = this.answerService.answerText;
  markedUser: string = '';
  users = this.dialogAddService.tagsData[this.varService.selectedChannel].members;
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
    private messageInputService:  MessageInputServiceService
    
  ) { }

  
  showAutocomplete() {
    this.showUsers = !this.showUsers;
    this.inputValue = '@' + this.userValue;
    
    if(this.showUsers) { this.highlightUsers()}
    if(this.userValue == '') {this.inputValue = ''}
  }


  highlightUsers() { // beim absenden mit einbauen?
    const message = this.inputValue;
    this.markedUser = this.highlightUsernames(message);
  }


  highlightUsernames(message: string) {
    for (const user of this.users) {
      const highlight = new RegExp(`@${user}\\b`, 'g');  // Wortgrenze + globaler Suchmodus
      message = message.replace(highlight, `<span class="highlight">${user}</span>`);
    }
    console.log('marked user should be',message);
    return message;
  }


  triggerInput() {
    this.uploadInput.nativeElement.click();
  }


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


  markUser() {
    // this.textarea = '@'+ this.dataService.userData[this.varService.selectedChannel].name;
  }



  // Bossi#####################################


  @ViewChild('fileInput') fileInput!: ElementRef;
  currentUser() {
    return (
      this.dataService.loggedInUserData.email ===
      this.dataService.userData[this.varService.selectedUserToMessage].email
    );
  }


  send() {
    // this.messageSend();
  }


  messageSend() {
    // if (this.varService.mainChatHead == 0 && this.messageService.messageText.length >= 1) {
    //   this.messageService.addMessage();   
    //   this.messageService.messageText = '';
    // }
    if(this.varService.mainChatHead == 0 && this.messageInputService.sendButtonEnabled && !this.messageInputService.placeholerView){
      this.messageInputService.resetVariables();
      this.messageInputService.setMyVariable(true);
      
      this.messageInputService.sendButtonEnabled = false;
    }


    // add by Bossi for directChatService
    if (this.varService.mainChatHead === 1 && this.directChatService.directChatActive && !this.currentUser()) {
      if(this.messageInputService.sendButtonEnabled && !this.messageInputService.placeholerView){
        this.messageInputService.resetVariables();
        this.messageInputService.setMyVariable(true);
        this.newMessageAmountService.addPartnerDirectChatMessageAmount();
        this.messageInputService.sendButtonEnabled = false;
      }
    }
    if (this.varService.mainChatHead === 1 && this.directChatService.directChatActive && this.currentUser() ){
      if(this.messageInputService.sendButtonEnabled && !this.messageInputService.placeholerView){
      this.messageInputService.resetVariables();
      this.messageInputService.setMyVariable(true) ;
      this.messageInputService.sendButtonEnabled = false;
      }
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
