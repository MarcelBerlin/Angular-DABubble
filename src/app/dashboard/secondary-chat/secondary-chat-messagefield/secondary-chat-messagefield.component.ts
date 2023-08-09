import { Component, ElementRef, ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { MessageService } from 'src/app/services/messages.service';
import { ChatService } from 'src/app/services/chat.service';
import { AppComponent } from 'src/app/app.component';
import { VariablesService } from 'src/app/services/variables.service';
import { DialogAddService } from 'src/app/services/dialog-add.service';

@Component({
  selector: 'app-secondary-chat-messagefield',
  templateUrl: './secondary-chat-messagefield.component.html',
  styleUrls: ['./secondary-chat-messagefield.component.scss']
})

export class SecondaryChatMessagefieldComponent {

  @ViewChild('reactions') reactions: ElementRef;

  public content: any = '';       // wieder loeschen, wenn main chat fertig ist
  public sentTime: any = '';      // wieder loeschen, wenn main chat fertig ist
  public message: any = {};       // wieder loeschen, wenn main chat fertig ist
  public userName: string = '';   // wieder loeschen, wenn main chat fertig ist
  public userImg: string = '';    // wieder loeschen, wenn main chat fertig ist
  public allMessages: any = [];   // wieder loeschen, wenn main chat fertig ist

  public threadEmojiLeft: boolean = false;
  public threadEmojiRight: boolean = false;

  public emojiPickerRight: boolean = false;
  public emojiPickerLeft: boolean = false;
  public emoji: string = '';
  public reactionArrLeft: any = [];
  public reactionArrRight: any = [];
  public emojiCounter: number = 0;

  constructor(public getUser: DataService,
    public app: AppComponent,
    public addService: DialogAddService,
    public varService: VariablesService,
    public getMessage: MessageService,
    public chatService: ChatService) {
  }


  // WIRD SPÄTER ALLES NOCH GEKÜRZT! 
  public addEmojiLeft(event) {
    this.threadEmojiLeft = true;
    this.reactionArrLeft = `${this.emoji}${event.emoji.native}`;
    this.getMessage.emojis.push(this.reactionArrLeft); // speichern in firebase?
    this.emojiPickerLeft = false;

    if (this.getMessage.emojis.length > 1) {
      this.emojiFilterLeft(this.getMessage.emojis);
    }
  }

  emojiFilterLeft(reactionArr) {
    const emojiCountMapLeft = new Map();
    let reactionBarLeft = document.getElementById("reactionsLeft"); // span für linke seite, wo emojis angezeigt werden

    reactionArr.forEach(emoji => {
      if (emojiCountMapLeft.has(emoji)) {
        emojiCountMapLeft.set(emoji, emojiCountMapLeft.get(emoji) + 1);
      } else { emojiCountMapLeft.set(emoji, 1); }
    });

    emojiCountMapLeft.forEach((count, emoji) => {
      reactionBarLeft.innerHTML = '';
      reactionBarLeft.innerHTML += `${emoji} ${count > 1 ? count : ""}`;
      this.emojiPickerLeft = false;
    });
  }


  public addEmojiRight(event) {
    this.threadEmojiRight = true;
    this.reactionArrRight = `${this.emoji}${event.emoji.native}`;
    this.getMessage.emojis.push(this.reactionArrRight); // speichern in firebase?
    this.emojiPickerRight = false;

    if (this.getMessage.emojis.length > 1) {
      this.emojiFilterRight(this.getMessage.emojis);
    }
  }


  emojiFilterRight(reactionArr) {
    const emojiCountMapRight = new Map();
    let reactionBarRight = document.getElementById("reactionsRight"); // span für rechte seite, wo emojis angezeigt werden

    reactionArr.forEach(emoji => {
      if (emojiCountMapRight.has(emoji)) {
        emojiCountMapRight.set(emoji, emojiCountMapRight.get(emoji) + 1);
      } else { emojiCountMapRight.set(emoji, 1); }
    });

    emojiCountMapRight.forEach((count, emoji) => {
      this.emojiPickerRight = true;
      reactionBarRight.innerHTML = '';
      reactionBarRight.innerHTML += `${emoji} ${count > 1 ? count : ""}`;
      this.emojiPickerRight = false;
    });
  }


  /**
   * subscribes messages from firebase from channel
   */
  getMessages() {
    console.log(this.addService.tagsData[this.varService.selectedChannel]);
  }

  // deleteDoubledEmojis(doubledEmoji) {
  //   for (let i = 0; i < doubledEmoji.length; i++) {
  //     if (doubledEmoji[i].emoji && doubledEmoji.filter(item => item.emoji === doubledEmoji[i].emoji).length > 1) {
  //       doubledEmoji.splice(i, 1);
  //       i--;
  //     }
  //   }
  // }
}