import { Injectable } from '@angular/core';
import * as emoji from "emoji-api"
import { VariablesService } from 'src/app/services/variables.service';

@Injectable({
  providedIn: 'root'
})
export class EmojiApiService {
  emojiDatabase: any[];
  selcectedEmoji: any[];
  emojiSelectorActive: boolean = false;

  constructor(
    private varService: VariablesService
  ) { 
    this.emojiDatabase = emoji.all();
  }


  /**
   * Toggles the emoji selector based on the 'mainChatHead'(1 and 2 are directChat) value from the 
   * 'varService'. If 'mainChatHead' is equal to 1 or 2, the emoji selector is toggled, otherwise, 
   * it is set to false(close the emoji menu).
   * 
   * @returns {void}
   */
  toggleEmojiSelector():void {
    if (this.varService.mainChatHead == 1 || this.varService.mainChatHead == 2) {
      this.emojiSelectorActive = !this.emojiSelectorActive;
    }else this.emojiSelectorActive = false;
  }
}
