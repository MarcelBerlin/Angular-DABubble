import { Injectable } from '@angular/core';
import { Component, ElementRef, ViewChild, HostListener } from '@angular/core';
import { MessageService } from './services/messages.service';
import { SecondaryChatMessagefieldComponent } from './dashboard/secondary-chat/secondary-chat-messagefield/secondary-chat-messagefield.component';
import { ChannelSelectionComponent } from './dashboard/main-chat/main-chat-chatfield/main-chat-channel-chat-field/channel-selection/channel-selection.component';
import { AuthService } from './services/auth.service';
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

  constructor(
    private authService: AuthService
  ) { }


}