import { Component } from '@angular/core';
import { TestBastiService } from 'src/app/services/test-basti.service';

@Component({
  selector: 'app-secondary-chat-head',
  templateUrl: './secondary-chat-head.component.html',
  styleUrls: ['./secondary-chat-head.component.scss']
})
export class SecondaryChatHeadComponent {


  constructor(private tBS :TestBastiService){}


  slideOut() {
    this.tBS.chatSlideOut()
  }
}
