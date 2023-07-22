import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-start-animation',
  templateUrl: './start-animation.component.html',
  styleUrls: ['./start-animation.component.scss']
})
export class StartAnimationComponent {
  windowWidth: number;


  constructor() {
    this.windowWidth = window.innerWidth;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.windowWidth = (event.target as Window).innerWidth;
  }

  isWindowWidthLessThan650(): boolean {
    return this.windowWidth < 650;
  }
}
