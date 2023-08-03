import { Component } from '@angular/core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Angular-DABubble';

  public reactionBoo: boolean = false;
  public reactionNumber: any = 0;
  public emoji: string = '';
  public isEmojiPickerVisible: boolean;
  public newReaction: any = [];


  constructor() { }

  public addEmoji(event) {
    this.reactionBoo = true;
    this.newReaction +=`${this.emoji}${event.emoji.native}`;
    this.isEmojiPickerVisible = false;
    this.reactionNumber++;
    console.log('emoji in appComponent is',this.newReaction);
    
    // Emoji dem User zuordnen.
    // if (this.reactionNumber > 1) {
    //   this.deleteDoubledEmojis(this.newReaction);
    // }
  }


  // ##### EMOJI HTML #####

//   <img ngDefaultControl name="emoji" [(ngModel)]="emoji" (click)="isEmojiPickerVisible = !isEmojiPickerVisible;"
//   src="./../../../../assets/img/reaction.png">
// <br />
// <emoji-mart ngDefaultControl class="emoji-mart" *ngIf="isEmojiPickerVisible" (emojiSelect)="addEmoji($event)"
//   title="Choose your emoji">
// </emoji-mart>
}
