import { Component } from '@angular/core';
import { EmojiApiService } from './services/emoji-api.service';
import { DirectChatService } from 'src/app/direct-chat/services/direct-chat.service';

@Component({
  selector: 'app-emoji-menu',
  templateUrl: './emoji-menu.component.html',
  styleUrls: ['./emoji-menu.component.scss']
})
export class EmojiMenuComponent {


  constructor(
    public emojiService: EmojiApiService,
    private directChatService: DirectChatService
    ){}

    
    /**
     * Inserts an emoji into the direct chat message input field and close the emoji selector.
     * 
     * @param {number} i - The index of the selected emoji in the emoji database.
     * @returns {void}
     */
    insertEmojiDirectChat(i: number):void {
      this.directChatService.directMessage += this.emojiService.emojiDatabase[i];
      this.emojiService.toggleEmojiSelector();
    }


    showGroup(index: number): void {
      this.emojiService.emojiDatabase = this.emojiService.allEmojisGroups[index];
    };
}
