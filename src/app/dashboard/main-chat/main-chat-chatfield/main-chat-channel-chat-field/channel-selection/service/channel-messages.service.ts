import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, updateDoc } from '@angular/fire/firestore';
import { DashboardComponentsShowHideService } from 'src/app/dashboard/dashboard-components-show-hide.service';
import { MenuSidenavComponent } from 'src/app/dashboard/menu-channels-workspaces/menu-sidenav/menu-sidenav.component';
import { SecondaryChatAnswerService } from 'src/app/dashboard/secondary-chat/service/secondary-chat-answer.service';
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
  selectedMessageArray: any = [];
  selectedMessage = false;
  selectedMessageIndex: number | null = null;
  selectedMessageId: string = '';
  currentDate: string = new Date().toISOString().split('T')[0]; // Aktuelles Tagesdatum im Format "YYYY-MM-DD";
  currentChannelId: string = '';
  messageEmojis: any = [];
  MessageAmount: number;

  constructor(
    private firestore: Firestore,
    public timelinesService: TimelinesService,
    private dcshService: DashboardComponentsShowHideService,
    private dialogAddService: DialogAddService,

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
    this.selectedMessageId = this.messageData[index].messageId;
    this.selectedMessage = true;
    this.dcshService.chatSlideIn();
  }

  getSelectedMessageStatus() {
    return this.selectedMessage;
  }


  getChannelMessageFromFirestore() {
    const selectedChannelId = this.currentChannelId;
    const selectedChannelData = this.dialogAddService.tagsData.find(
      (tagsData) => tagsData.id === selectedChannelId
    );
    console.log(selectedChannelData);
    if (selectedChannelData) {
      this.increaseChannelMessageCount(selectedChannelData);
      const qData = doc(this.firestore, 'tags', selectedChannelId);
      const newData = {
        channelMessageAmount: selectedChannelData.channelMessageAmount,
      };
      this.tryUpdateToFirebase(qData, newData);
    } else {
      console.error('Die ausgewählte Nachricht wurde im Array nicht gefunden.');
    }
  }

  // funktion zum hochzählen der messages

  increaseChannelMessageCount(selectedChannelData) {
    selectedChannelData.channelMessageAmount += 1;
  }

  // Firebase wird mit den daten geuptdated

  tryUpdateToFirebase(qData, newData) {
    try {
      updateDoc(qData, newData);
      console.log('Message gesendet und channelMessageAmount aktualisiert.');
    } catch (error) {
      console.error('Fehler beim Aktualisieren der Firestore-Daten:', error);
    }
  }


  UpdateEmojiToFirebase(index: number){ 
    const messageIdForEmoji = this.messageData[index].messageId;
    const qData = doc(this.firestore, 'newMessages', messageIdForEmoji);
    const newData = { messageEmojis: this.messageEmojis }; 
  
    try {
      updateDoc(qData, newData);
      console.log('Message Emoji wurde korrekt hinzugefügt');
    } catch (error) {
      console.error('Fehler beim Aktualisieren der Firestore-Daten:', error);
    }
  }
}