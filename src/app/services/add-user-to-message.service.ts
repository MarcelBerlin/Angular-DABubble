import { Injectable } from '@angular/core';
import { DirectChatService } from '../direct-chat/services/direct-chat.service';

@Injectable({
  providedIn: 'root'
})
export class AddUserToMessageService {

  constructor(private directChatService:DirectChatService) { }

  addToMessage() {
    this.directChatService.directMessage += `hier wird noch gearbeitet`;
    console.log(this.directChatService.directMessage);
    
  }
}
