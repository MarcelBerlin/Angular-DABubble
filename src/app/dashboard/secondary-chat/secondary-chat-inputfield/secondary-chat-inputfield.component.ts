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

  constructor(public varService: VariablesService,
    public dataService: DataService,
    public dialogAddService: DialogAddService,
    public messageService: MessageService,
    public chatService: ChatService,
    public answerService: SecondaryChatAnswerService
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
}
