import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-main-chat-multi-message-head',
  templateUrl: './main-chat-multi-message-head.component.html',
  styleUrls: ['./main-chat-multi-message-head.component.scss']
})
export class MainChatMultiMessageHeadComponent {
  constructor(public dataService: DataService) { }
}
