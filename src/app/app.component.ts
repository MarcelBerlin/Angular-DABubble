import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { Component, ElementRef, ViewChild, HostListener } from '@angular/core';
import { MessageService } from './services/messages.service';
import { SecondaryChatMessagefieldComponent } from './dashboard/secondary-chat/secondary-chat-messagefield/secondary-chat-messagefield.component';
import { ChannelSelectionComponent } from './dashboard/main-chat/main-chat-chatfield/main-chat-channel-chat-field/channel-selection/channel-selection.component';
import { AuthService } from './services/auth.service';

import { VariablesService } from './services/variables.service';
@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Angular-DABubble';
  onDestroy$: any;

  constructor(
    private authService: AuthService,
    private breakpointObserver: BreakpointObserver,
    private varService: VariablesService
  ) {}

  ngOnInit() {
    this.breakpointObserver.observe([
      Breakpoints.Handset,
      Breakpoints.Tablet,
      Breakpoints.HandsetPortrait,
  Breakpoints.TabletPortrait,
    ]).subscribe(result => {
      if (result.matches) {        
        this.varService.mobileMatch = true
      }
      else{        
        this.varService.mobileMatch = false
      }
    });  }
}
