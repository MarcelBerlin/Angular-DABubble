import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { MessageService } from 'src/app/services/messages.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-secondary-chat-messagefield',
  templateUrl: './secondary-chat-messagefield.component.html',
  styleUrls: ['./secondary-chat-messagefield.component.scss']
})
export class SecondaryChatMessagefieldComponent {

  public emoji: string = '';
  public chatMessages: any = [];
  public isEmojiPickerVisible: boolean;
  public message: any = {};   // later ngModel
  public content: any = '';
  public actualTime: any = this.time.transform((new Date), 'dd.MM.yyyy hh:mm:ss');
  public sentTime: string = this.actualTime // change in time of sending message

  constructor(public getUser: DataService, public getMessage: MessageService, public time: DatePipe) {
    setTimeout(() => this.getMessages(), 500);
  }

  public addEmoji(event) {
    if (this.emoji) {
      this.emoji = `${this.emoji}${event.emoji.native}`;
      this.isEmojiPickerVisible = false;
    }
  }

  async getMessages() {
    this.message = 
    {
      name: this.getUser.loggedInUserData.name,
      time: this.sentTime,
      message: this.content,
      img: this.getUser.loggedInUserData.img,
      emoji: this.emoji
    };
    console.log('thread-mesage',this.message);
  };



}
