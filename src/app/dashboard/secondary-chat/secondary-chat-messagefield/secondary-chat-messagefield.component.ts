import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { MessageService } from 'src/app/services/messages.service';
import { ChatService } from 'src/app/services/chat.service';
import { AppComponent } from 'src/app/app.component';
import { VariablesService } from 'src/app/services/variables.service';
import { DialogAddService } from 'src/app/services/dialog-add.service';
import { ChannelMessagesService } from '../../main-chat/main-chat-chatfield/main-chat-channel-chat-field/channel-selection/service/channel-messages.service';
import { SecondaryChatAnswerService } from '../service/secondary-chat-answer.service';
import { MessageInputServiceService } from 'src/app/message-input/service/message-input-service.service';

@Component({
  selector: 'app-secondary-chat-messagefield',
  templateUrl: './secondary-chat-messagefield.component.html',
  styleUrls: ['./secondary-chat-messagefield.component.scss'],
})
export class SecondaryChatMessagefieldComponent implements OnInit {
  @ViewChild('secondaryChatautoscrollContainer') private container: ElementRef;

  index: number = 0;
  autoscroll: boolean = true;

  constructor(
    public getUser: DataService,
    public app: AppComponent,
    public addService: DialogAddService,
    public varService: VariablesService,
    public getMessage: MessageService,
    public chatService: ChatService,
    public channelMessages: ChannelMessagesService,
    public dataService: DataService,
    public answerService: SecondaryChatAnswerService,
    public inputService: MessageInputServiceService
  ) {
    this.answerService.getThreadAnswer();
  }

  ngOnInit() {}

  /**
   * Retrieves the status of the selected message.
   *
   * @function getSelectedMessageStatus
   * @returns {any} - The status of the selected message.
   */
  getSelectedMessageStatus() {
    return this.channelMessages.getSelectedMessageStatus();
  }


  /**
   * Lifecycle hook that executes after Angular has checked the component's view.
   * If autoscroll is enabled (true), it calls the 'scrollToBottom' method to scroll
   * the chat container to the bottom.
   *
   * @returns {void}
   */
  ngAfterViewChecked(): void {
    if (this.autoscroll == true) {
      this.scrollToBottom();
    }
  }

  /**
   * Scrolls the chat container to the bottom.
   *
   * @returns {void}
   */
  scrollToBottom(): void {
    if (this.container) {
      const container = this.container.nativeElement;
      container.scrollTop = container.scrollHeight;
    }
  }

  /**
   * Handles the 'scroll' event of the chat container.
   * Determines whether the user is manually scrolling up or reaching the bottom of the chat.
   * Updates the 'autoscroll' flag accordingly to enable or disable autoscroll behavior.
   *
   * @param {Event} event - The 'scroll' event object.
   * @returns {void}
   */
  handleScroll(event: Event): void {
    const container = event.target as HTMLElement;
    const currentScrollTop = container.scrollTop;
    const isScrollingUp = this.varService.previousScrollTop > currentScrollTop;
    if (isScrollingUp) this.autoscroll = false;
    else {
      const scrollOffset = container.scrollHeight - container.clientHeight;
      if (currentScrollTop >= scrollOffset - 1) this.autoscroll = true;
    }
    this.varService.previousScrollTop = currentScrollTop;
  }

  showInfoBox: number = -1;
  timeoutArray: any[] = [];

  /**
   * Displays additional information or an info box for an item or element at the specified index.
   *
   * @param {number} index - The index of the item or element for which to display information.
   * @returns {void}
   */
  showInfoOutput(index: number, i: number): void {
    this.clearTimoutArray();
    const indexString = index.toString();
    const iString = i.toString();
    const newNumber = +(indexString + iString);
    this.showInfoBox = newNumber;
  }

  /**
   * Creates a unique information ID by combining two numbers.
   *
   * @param {number} index - The first number to be combined.
   * @param {number} i - The second number to be combined.
   * @returns {number} A new unique information ID.
   */
  createInfoId(index: number, i: number): number {
    const indexString = index.toString();
    const iString = i.toString();
    const newNumber = +(indexString + iString);
    return newNumber;
  }

  /**
   * Hides or closes the currently displayed information or info box.
   *
   * @returns {void}
   */
  hideInfoOutput(): void {
    let leaveTimeOut = setTimeout(() => {
      this.showInfoBox = -1;
    }, 500);
    this.timeoutArray.push(leaveTimeOut);
  }

  /**
   * Clears all timeouts stored in the timeoutArray.
   *
   * @returns {void}
   */
  clearTimoutArray(): void {
    for (let i = 0; i < this.timeoutArray.length; i++) {
      const element = this.timeoutArray[i];
      clearTimeout(element);
    }
  }

  console(entry) {
    console.log(entry);
  }
}
