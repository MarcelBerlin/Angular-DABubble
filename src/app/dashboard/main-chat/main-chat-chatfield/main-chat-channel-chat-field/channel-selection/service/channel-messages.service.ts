import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { DashboardComponentsShowHideService } from 'src/app/dashboard/dashboard-components-show-hide.service';
import { TimelinesService } from 'src/app/direct-chat/services/timelines.service';
import { MessageService } from 'src/app/services/messages.service';

@Injectable({
  providedIn: 'root'
})
export class ChannelMessagesService {

  index: number = 0;
  messages$: any = [];
  messageData: any = [];
  selectedMessage = false;
  selectedMessageIndex: number | null = null;
  groupedMessages: { [key: string]: any[] } = {};


  constructor(
    private firestore: Firestore,
    public timelinesService: TimelinesService,
    private dcshService: DashboardComponentsShowHideService,    
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
      console.log(this.messageData);
      this.updateGroupedMessages();
      console.log(this.groupedMessages);
    });
  }

  updateGroupedMessages() {
    this.groupedMessages = {}; // Leere die bestehende Struktur
    for (const message of this.messageData) {
      const messageDate = new Date(message.dateTimeNumber);
      const dayKey = messageDate.toDateString();
  
      if (!this.groupedMessages[dayKey]) {
        this.groupedMessages[dayKey] = [];
      }
  
      this.groupedMessages[dayKey].push(message);
    }
  }



  isDifferentDay(message1, message2) {
    const date1 = new Date(message1.dateTimeNumber);
    const date2 = new Date(message2.dateTimeNumber);
    return date1.toDateString() !== date2.toDateString();
  }
  
  getFormattedDate(message) {
    const messageDate = new Date(message.dateTimeNumber);
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      day: 'numeric',
      month: 'long'
    };
    return messageDate.toLocaleDateString(undefined, options);
  }
  
  
 
  openAnswer(index: number) {
    this.selectedMessageIndex = index;
    this.selectedMessage = true;
    this.dcshService.chatSlideIn();
    console.log(this.messageData);    
    
  }

  getSelectedMessageStatus() {
    return this.selectedMessage;
  }

}
