import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VariablesService } from 'src/app/services/variables.service';

@Injectable({
  providedIn: 'root'
})
export class EmojiPickerBossiService {
  private jsonUrl = '../assets/emojis.json';
  emojiSelectorActive = false;
  emojiSelectorActiveThread = false;


  constructor(private http: HttpClient, private varService: VariablesService) { }


  /**
   * Loads emoji data from the specified JSON URL using an HTTP GET request.
   * @returns {Observable<any>} An observable that emits the loaded emoji data.
   */
  loadEmojisData(): Observable<any> {
    return this.http.get(this.jsonUrl);
  }


  /**
   * Toggles the emoji selector based on the 'mainChatHead'(1 and 2 are directChat) value from the 
   * 'varService'. If 'mainChatHead' is equal to 1 or 2, the emoji selector is toggled, otherwise, 
   * it is set to false(close the emoji menu).
   * 
   * @returns {void}
   */
  toggleEmojiSelector(): void {
    if (this.varService.mainChatHead == 0 ||this.varService.mainChatHead == 1 || this.varService.mainChatHead == 2) {
      this.emojiSelectorActive = !this.emojiSelectorActive;
      this.emojiSelectorActiveThread = false;
    } else this.emojiSelectorActive = false;
  }

  toggleEmojiSelectorThread(): void {
    console.log('thread');
    if (this.varService.mainChatHead == 0 ||this.varService.mainChatHead == 1 || this.varService.mainChatHead == 2) {
      this.emojiSelectorActiveThread = !this.emojiSelectorActiveThread;
      this.emojiSelectorActive = false;
    } else this.emojiSelectorActiveThread = false;
  }
  
}
