import { Component } from '@angular/core';
import { VariablesService } from 'src/app/services/variables.service';
@Component({
  selector: 'app-main-chat',
  templateUrl: './main-chat.component.html',
  styleUrls: ['./main-chat.component.scss'],
})
export class MainChatComponent {
  previousScrollTop: number = 0;
  autoscroll: boolean = true;


  constructor(
    public varService: VariablesService
  ) { }


  /**
   * Lifecycle hook that executes after Angular has checked the component's view.
   * If autoscroll is enabled (true), it calls the 'scrollToBottom' method to scroll 
   * the chat container to the bottom.
   * 
   * @returns {void}
   */
  ngAfterViewChecked(): void {
    if (this.autoscroll == true) this.scrollToBottom();
  }


  /**
   * Scrolls the chat container to the bottom.
   * 
   * @returns {void}
   */
  scrollToBottom(): void {
    // console.log('scrollToBottom');
    const container = document.getElementById('autoscrollContainer');
    container.scrollTop = container.scrollHeight;
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
    const isScrollingUp = this.previousScrollTop > currentScrollTop;
    if (isScrollingUp) {
      this.autoscroll = false;
      // console.log('Scroll Up erkannt!');
    } else {
      const scrollOffset = container.scrollHeight - container.clientHeight;
      if (currentScrollTop >= scrollOffset) {
        // console.log('Bottom erreicht!');
        this.autoscroll = true;
      }
    }
    this.previousScrollTop = currentScrollTop;
  }
}


