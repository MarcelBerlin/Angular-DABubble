import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  updateDoc,
  arrayUnion,
} from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { DashboardComponentsShowHideService } from 'src/app/dashboard/dashboard-components-show-hide.service';
import { MenuSidenavComponent } from 'src/app/dashboard/menu-channels-workspaces/menu-sidenav/menu-sidenav.component';
import { SecondaryChatAnswerService } from 'src/app/dashboard/secondary-chat/service/secondary-chat-answer.service';
import { DialogEditMessageComponent } from 'src/app/dialog/dialog-edit-message/dialog-edit-message.component';
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
  selectedMessageContent: string = '';
  currentDate: string = new Date().toISOString().split('T')[0]; // Aktuelles Tagesdatum im Format "YYYY-MM-DD";
  currentChannelId: string = '';
  currentChannel: string = '';
  messageEmojis: any = [];
  emote: boolean = false;
  MessageAmount: number;
  messageContentEdit: any = [
    {
      tagType: 'text',
      content: ''
    },
  ];



  constructor(
    public dialog: MatDialog,
    private firestore: Firestore,
    public timelinesService: TimelinesService,
    private dcshService: DashboardComponentsShowHideService,
    private dialogAddService: DialogAddService,
  ) {
    this.allMessages();
  }


  /**
 * Fetches all messages from the Firestore database and sorts them based on the timestamp.
 *
 * @async
 * @function
 * @returns {Promise<void>} A promise that fulfills when all messages are successfully loaded and sorted.
 * @throws {Error} An error if loading or sorting the messages fails.
 *
 */
  async allMessages() {
    const coll = collection(this.firestore, 'newMessages');
    this.messages$ = collectionData(coll, { idField: 'id' });
    await this.messages$.subscribe((message: any) => {
      this.messageData = message.sort(
        (a, b) => a.dateTimeNumber - b.dateTimeNumber
      );
    });
  }


  /**
 * Formats a date string in the format 'DD.MM.YYYY' to 'DD,MM.YYYY'.
 *
 * @param {string} dateString - The date string to be formatted.
 * @returns {string} The formatted date string or the original string if the format is not 'DD.MM.YYYY'.
 *
 */
  formatDate(dateString) {
    const dateParts = dateString.split('.');
    if (dateParts.length === 3) {
      const year = dateParts[2];
      const month = dateParts[1];
      const day = dateParts[0];
      return `${day},${month}.${year}`;
    } else {
      return dateString;
    }
  }


  /**
 * Opens the answer corresponding to the given index in the message data.
 *
 * @param {number} index - The index of the selected message in the message data array.
 * @returns {void}
 *
 */
  openAnswer(index: number) {
    this.selectedMessageIndex = index;
    this.selectedMessageId = this.messageData[index].messageId;
    this.selectedMessage = true;
    this.dcshService.chatSlideIn();
  }


  /**
 * Edits the content of the user's own message identified by the given index.
 *
 * @param {number} index - The index of the selected message in the message data array.
 * @returns {void}
 *
 */
  editOwnMessage(index: number) {
    this.selectedMessageIndex = index;
    this.selectedMessageId = this.messageData[index].messageId;
    this.selectedMessageContent = this.messageData[index].content[0].content;
    this.dialog.open(DialogEditMessageComponent);
  }


/**
 * Edits the content of the user's own message identified by the given index.
 *
 * @param {number} index - The index of the selected message in the message data array.
 * @returns {void}
 *
 */
  getActualMessageFromFirestore(messageEdit) {
    const messageId = this.selectedMessageId;
    const messageIndex = this.messageData.findIndex((message) => message.id === messageId );
    this.messageContentEdit[0].content = messageEdit;
    if (messageIndex !== -1) {
      const qData = doc(this.firestore, 'newMessages', messageId);
      const newData = { content: this.messageContentEdit };
      try {
        updateDoc(qData, newData);
        console.log('Update erfolgreich!');
        this.messageData[messageIndex].content[0].content = this.messageContentEdit;
      } catch (e) {
        console.log('Update hat nicht funktioniert!!');
      }
    }
  }


  /**
 * Gets the status of the selected message.
 *
 * @returns {boolean} The status of the selected message. `true` if a message is selected, otherwise `false`.
 *
 */
  getSelectedMessageStatus() {
    return this.selectedMessage;
  }


/**
 * Retrieves channel message data from Firestore based on the current channel ID.
 * If the channel is found in the `tagsData` array, it increases the channel message count
 * and updates the corresponding Firestore document with the new message count.
 *
 * @function
 * @returns {void}
 *
 */
  getChannelMessageFromFirestore() {
    const selectedChannelId = this.currentChannelId;
    const selectedChannelData = this.dialogAddService.tagsData.find( (tagsData) => tagsData.id === selectedChannelId );
    if (selectedChannelData) {
      this.increaseChannelMessageCount(selectedChannelData);
      const qData = doc(this.firestore, 'tags', selectedChannelId);
      const newData = { channelMessageAmount: selectedChannelData.channelMessageAmount};
      this.tryUpdateToFirebase(qData, newData);
    } 
    else { console.error('Die ausgewählte Nachricht wurde im Array nicht gefunden.');}
    this.currentChannel = selectedChannelData;
  }


  /**Increases the message count for the specified channel data.
  *
  * @function
  * @param {object} selectedChannelData - The data of the channel for which to increase the message count.
  * @returns {void}
  *
  */
  increaseChannelMessageCount(selectedChannelData) {
    selectedChannelData.channelMessageAmount += 1;
  }


  /**
 * Tries to update Firestore data using the provided document reference and new data.
 *
 * @function
 * @param {object} qData - Reference to the Firestore document to be updated.
 * @param {object} newData - The updated data to be applied to the Firestore document.
 * @returns {void}
 *
 */
  tryUpdateToFirebase(qData, newData) {
    try {
      updateDoc(qData, newData);
      // console.log('Message gesendet und channelMessageAmount aktualisiert.');
    } catch (error) {
      console.error('Fehler beim Aktualisieren der Firestore-Daten:', error);
    }
  }


  /**
 * Updates the message emojis in Firestore for the message at the specified index.
 *
 * @function
 * @param {number} index - The index of the message in the message data array.
 * @returns {void}
 *
 */
  UpdateEmojiToFirebase(index: number) {
    const messageIdForEmoji = this.messageData[index].messageId;
    const qData = doc(this.firestore, 'newMessages', messageIdForEmoji);
    const newData = { messageEmojis: this.messageData[index].messageEmojis };
    try {
      updateDoc(qData, newData);
      console.log('Message Emoji wurde korrekt hinzugefügt');
    } catch (error) {
      console.error('Fehler beim Aktualisieren der Firestore-Daten:', error);
    }
  }
}