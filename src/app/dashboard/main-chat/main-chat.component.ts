import { Component } from '@angular/core';
import { TestBastiService } from 'src/app/services/test-basti.service';

@Component({
  selector: 'app-main-chat',
  templateUrl: './main-chat.component.html',
  styleUrls: ['./main-chat.component.scss']
})
export class MainChatComponent {


  constructor(private tBS: TestBastiService) { }
  
  openChat() {
    this.tBS.chatSlideIn();
  }
}
