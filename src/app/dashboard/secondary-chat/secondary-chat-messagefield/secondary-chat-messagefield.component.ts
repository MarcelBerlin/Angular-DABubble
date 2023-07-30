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
  public content: any = 'MUSTERNACHRICHT';
  public actualTime: any = this.time.transform((new Date), 'HH:mm:ss');
  public sentTime: string = this.actualTime // change later to sending message time
  public message: any = {};
  public newMessages: number = 0;

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
      // *ngFor all messages from channel
    this.message = 
    {
      name: this.getUser.loggedInUserData.name, // user from channel
      time: this.sentTime,                      // time from channel
      message: this.content,                    // message from channel
      img: this.getUser.loggedInUserData.img,   //  user-img from channel
      emoji: this.emoji                         // reaction bar from channel
    };

    console.log('thread-mesage',this.message);
  };
}
