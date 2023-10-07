import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { DashboardComponentsShowHideService } from 'src/app/dashboard/dashboard-components-show-hide.service';
import { TimelinesService } from 'src/app/direct-chat/services/timelines.service';
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
  currentDate: string = new Date().toISOString().split('T')[0]; // Aktuelles Tagesdatum im Format "YYYY-MM-DD";
 
   

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
    });
    
  }


  // #################################
  // ##################### TEST FÜR TIMESTAMP VON MARCEL
  // #################################  

  formatDate(dateString) {
    // Splitte die Zeichenfolge an "." (Punkt) und erhalte Jahr, Monat und Tag
    const dateParts = dateString.split('.');
    if (dateParts.length === 3) {
      const year = dateParts[2];
      const month = dateParts[1];
      const day = dateParts[0];
      return `${day},${month}.${year}`;
    } else {
      return dateString; // Rückgabe der Zeichenfolge, wenn das Format nicht erkannt wird
    }
  }

  // #####################
  // ##################### TEST FÜR TIMESTAMP VON MARCEL
  // #####################
   

  openAnswer(index: number) {
    this.selectedMessageIndex = index;
    this.selectedMessage = true;
    this.dcshService.chatSlideIn();   
  }

  getSelectedMessageStatus() {
    return this.selectedMessage;
  }
}
