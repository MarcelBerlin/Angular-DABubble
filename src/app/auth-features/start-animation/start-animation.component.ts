import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-start-animation',
  templateUrl: './start-animation.component.html',
  styleUrls: ['./start-animation.component.scss']
})
export class StartAnimationComponent {
  windowWidth: number;


  constructor() {
    this.windowWidth = window.innerWidth; // Initialize windowWidth with the current window width
  }


  /**
   * Listens for the 'resize' event of the window and updates the window width.
   * 
   *  @param event - obje The eventct of the 'resize' event. 
   */
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.windowWidth = (event.target as Window).innerWidth;
  }


  /**
   * Checks if the window width is less than 650 pixels.
   * 
   * @returns {boolean} - `true` if the window width is less than 650 pixels, otherwise `false`. 
   */
  isWindowWidthLessThan650(): boolean {
    return this.windowWidth < 769;
  }
}
