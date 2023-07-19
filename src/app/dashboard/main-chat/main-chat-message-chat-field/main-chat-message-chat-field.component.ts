import { Component } from '@angular/core';
import { VariablesService } from 'src/app/services/variables.service';

@Component({
  selector: 'app-main-chat-message-chat-field',
  templateUrl: './main-chat-message-chat-field.component.html',
  styleUrls: ['./main-chat-message-chat-field.component.scss'],
})
export class MainChatMessageChatFieldComponent {
  constructor(public varService: VariablesService) {}
}
