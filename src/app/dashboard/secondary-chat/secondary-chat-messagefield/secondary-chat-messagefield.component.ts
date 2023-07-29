import { Component } from '@angular/core';

@Component({
  selector: 'app-secondary-chat-messagefield',
  templateUrl: './secondary-chat-messagefield.component.html',
  styleUrls: ['./secondary-chat-messagefield.component.scss']
})
export class SecondaryChatMessagefieldComponent {

  public emoji: string = "";

  public isEmojiPickerVisible: boolean;

  public addEmoji(event) {
    this.emoji = `${this.emoji}${event.emoji.native}`;
    this.isEmojiPickerVisible = false;
    console.log(this.emoji);
  }

  constructor() { }

}
