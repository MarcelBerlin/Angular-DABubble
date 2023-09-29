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
  currentDate: string = new Date().toISOString().split('T')[0]; // Aktuelles Tagesdatum im Format "YYYY-MM-DD"
   

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


  //  isMessageForNewDay(message: any, index: number): boolean {   
  //   if (index === 0) {
  //     // Die erste Nachricht wird immer als neuer Tag betrachtet
  //     return true;
  //   }
  //   const previousMessage = this.messageData[index - 1];   
  
  //   // Aufteilen der Datumszeichenfolgen in Jahr, Monat und Tag
  
  //   const messageDate = this.formatDateToYYYYMMDD(message.dateString);
  //   const previousMessageDate = this.formatDateToYYYYMMDD(previousMessage.dateString);

  //   const messageDateParts = messageDate.split('-');
  //   const previousMessageDateParts = previousMessageDate.split('-');   
  
  //   // Vergleicht das Jahr, den Monat und den Tag der aktuellen Nachricht mit dem vorherigen
  //   return (
  //     parseInt(messageDateParts[0], 10) !== parseInt(previousMessageDateParts[0], 10) ||
  //     parseInt(messageDateParts[1], 10) !== parseInt(previousMessageDateParts[1], 10) ||
  //     parseInt(messageDateParts[2], 10) !== parseInt(previousMessageDateParts[2], 10)
  //   );
  // }

  // // Der DateString wird in das Format "YYYY, MM, DD" konvertiert, damit die isMessageForNewDay Funktion korrekt ausgeführt wird

  // formatDateToYYYYMMDD(dateString) {
  //   // Splitte die Zeichenfolge an "." (Punkt) und erhalte Jahr, Monat und Tag
  //   const dateParts = dateString.split('.');
  //   if (dateParts.length === 3) {
  //     const year = dateParts[2];
  //     const month = dateParts[1];
  //     const day = dateParts[0];
  //     return `${year}-${month}-${day}`;
  //   } else {
  //     return dateString; // Rückgabe der Zeichenfolge, wenn das Format nicht erkannt wird
  //   }
  // }

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
