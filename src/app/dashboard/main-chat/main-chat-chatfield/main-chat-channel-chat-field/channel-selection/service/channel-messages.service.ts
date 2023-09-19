import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { DashboardComponentsShowHideService } from 'src/app/dashboard/dashboard-components-show-hide.service';
import { TimelinesService } from 'src/app/direct-chat/services/timelines.service';
import { DialogAddService } from 'src/app/services/dialog-add.service';
import { MessageService } from 'src/app/services/messages.service';

@Injectable({
  providedIn: 'root',
})
export class ChannelMessagesService {
  index: number = 0;
  messages$: any = [];
  messageData: any = [];
  selectedMessage = false;
  selectedMessageIndex: number | null = null;
  groupedMessages: { [key: string]: any[] } = {};
  selectedChannelId: string = '';

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

  formatDate(dayKey: string): string {
    const messageDate = new Date(dayKey);
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    };
    return messageDate.toLocaleDateString(undefined, options);
  }

  getDistinctDaysInCurrentChannel() {
    const currentChannelId = this.selectedChannelId;
    return Object.keys(this.groupedMessages).filter((dayKey) =>
      this.groupedMessages[dayKey].some(
        (message) => message.channelId === currentChannelId
      )
    );
  }

  openAnswer(index: number, dayKey: string) {   
    const messagesForDay = this.groupedMessages[dayKey];
    if (messagesForDay && messagesForDay[index]) {
      const selectedMessage = messagesForDay[index];
      this.selectedMessageIndex = index;
      this.selectedMessage = true;
      this.dcshService.chatSlideIn();
      console.log(selectedMessage);      
    }
  }
  

  getSelectedMessageStatus() {
    return this.selectedMessage;
  }
}
