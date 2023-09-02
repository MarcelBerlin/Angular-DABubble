import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { DashboardComponentsShowHideService } from 'src/app/dashboard/dashboard-components-show-hide.service';
import { TimelinesService } from 'src/app/direct-chat/services/timelines.service';

@Injectable({
  providedIn: 'root'
})
export class ChannelMessagesService {

  index: number = 0;
  messages$: any = [];
  messageData: any = [];
  selectedMessage = false;
  selectedMessageIndex: number | null = null;

  constructor(
    private firestore: Firestore,
    public timelinesService: TimelinesService,
    private dcshService: DashboardComponentsShowHideService
  ) {
    this.allMessages();
  }


  async allMessages() {
    const coll = collection(this.firestore, 'newMessages');
    this.messages$ = collectionData(coll, { idField: 'id' });
    await this.messages$.subscribe((message: any) => {
      this.messageData = message.sort(
        (a, b) => a.dateTimeNumber - b.dateTimeNumber
      );
    });
  }

  openAnswer(index: number) {
    this.selectedMessageIndex = index;
    this.selectedMessage = true;
    this.dcshService.chatSlideIn();
    console.log(this.messageData);
    console.log('es fehlen antworten auf den thread. siehe secondary answer Service log');
    
  }

  getSelectedMessageStatus() {
    return this.selectedMessage;
  }

}
