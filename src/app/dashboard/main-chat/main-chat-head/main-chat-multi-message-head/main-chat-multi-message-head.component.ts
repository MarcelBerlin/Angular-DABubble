import { Component } from '@angular/core';
import { DialogAddService } from 'src/app/services/dialog-add.service';

@Component({
  selector: 'app-main-chat-multi-message-head',
  templateUrl: './main-chat-multi-message-head.component.html',
  styleUrls: ['./main-chat-multi-message-head.component.scss']
})
export class MainChatMultiMessageHeadComponent {
  constructor(public dialogAddService:DialogAddService) { }
}
