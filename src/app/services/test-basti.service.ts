import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TestBastiService {
  channelName: string = 'Entwicklerteam';
  secondaryChatSlideOut: boolean = false;


  constructor() {}

  editChannel(channelName: string) {
    this.channelName = channelName;
  }

  chatSlideOut() {
    this.secondaryChatSlideOut = true;
  }

  chatSlideIn() {
    this.secondaryChatSlideOut = false;
  }
}
