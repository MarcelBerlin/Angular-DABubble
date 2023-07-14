import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TestBastiService {

  channelName: string = 'Entwicklerteam';
  constructor() { }

  editChannel(channelName: string) {
    this.channelName = channelName;
  }
}
