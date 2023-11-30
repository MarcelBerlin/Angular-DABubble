import { EventEmitter, Injectable, OnInit } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  doc,
  getDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { TimelinesService } from 'src/app/direct-chat/services/timelines.service';
import { Answers } from '../models/answer-model.class';
import { DialogAddService } from 'src/app/services/dialog-add.service';
import { DataService } from 'src/app/services/data.service';
import { VariablesService } from 'src/app/services/variables.service';
import { DirectChatService } from 'src/app/direct-chat/services/direct-chat.service';
import { ChannelTimeStamp } from '../../main-chat/main-chat-chatfield/main-chat-channel-chat-field/channel-selection/models/channel-timestamp.class';
import { ChannelMessagesService } from '../../main-chat/main-chat-chatfield/main-chat-channel-chat-field/channel-selection/service/channel-messages.service';
import { MessageService } from 'src/app/services/messages.service';
import { ChannelTimestampService } from '../../main-chat/main-chat-chatfield/main-chat-channel-chat-field/channel-selection/service/channel-timestamp.service';
import { Messages } from 'src/app/models/messages.interface';

@Injectable({
  providedIn: 'root',
})
export class SecondaryChatAnswerService {
  index: number = 0;
  answers$: any = [];
  answerData: any = [];
  newAnswer: Answers = new Answers();
  answerText: string = '';
  messageId: string | null = null;
  actualMessageAmount: number;
  actualClockTime: string;
  messagesArray: any = [];

  constructor(
    private firestore: Firestore,
    public timelinesService: TimelinesService,
    private dialogAddService: DialogAddService,
    public dataService: DataService,
    public varService: VariablesService,
    private messageService: MessageService,
    public channelMessages: ChannelMessagesService,
    private channelTimestampService: ChannelTimestampService
  ) {}

  /**
   * Checks if the answer input field is filled; if so, sends the answer, otherwise alerts the user.
   *
   * @function checkIfInputIsFilled
   * @memberof SecondaryChatAnswerService
   * @returns {void}
   */
  async checkIfInputIsFilled() {
    if (this.answerText.length > 0) {
      await this.sendAnswer();
    } else {
      alert('Bitte das Inputfeld nicht leer lassen!');
      return;
    }
  }

  /**
   * Sends an answer by setting user details, adding a timestamp, saving the answer with an ID,
   * retrieving answer amount data from Firestore, and updating local data arrays.
   *
   * @function sendAnswer
   * @memberof SecondaryChatAnswerService
   * @returns {void}
   */
  async sendAnswer() {
    this.UserAndAnswerDetails();
    this.addTimeStampToAnswer();
    this.saveAnswerWithAnswerId();
    this.getAnswerAmountFromFirestore();
    this.answerData.push(this.newAnswer);
    this.channelMessages.selectedMessageArray.push(this.newAnswer);
    this.answerText = '';
  }

  /**
   * Sets user and answer details for the new answer.
   *
   * @function UserAndAnswerDetails   
   * @returns {void}
   */
  UserAndAnswerDetails() {
    this.newAnswer.channelId =
      this.dialogAddService.tagsData[this.dialogAddService.channelIndex].id; // die ChannelID wird auf die jeweilige neue Message Datei angewendet
    this.varService.selectedChannelId =
      this.dialogAddService.tagsData[this.dialogAddService.channelIndex].id;
    this.newAnswer.userId = this.dataService.loggedInUserData.userId;
    this.newAnswer.userName = this.dataService.loggedInUserData.name;
    this.newAnswer.userImg = this.dataService.loggedInUserData.img;
  }

  /**
   * Adds a timestamp to the new answer.
   *
   * @function addTimeStampToAnswer
   * @returns {void}
   */
  addTimeStampToAnswer() {
    const timeStampData: ChannelTimeStamp =
      this.channelTimestampService.getActualTimeStampForChannels();
    this.newAnswer.dateTimeNumber = timeStampData.dateTimeNumber;
    this.newAnswer.dateString = timeStampData.dateString;
    this.newAnswer.clockString = timeStampData.clockString;
  }

  /**
   * Saves an answer with an answerId to the 'threadAnswer' collection in Firestore.
   *
   * @function saveAnswerWithAnswerId 
   * @returns {Promise<void>} - A promise that resolves once the answer is saved with an answerId.
   */
  async saveAnswerWithAnswerId(): Promise<void> {
    const coll = collection(this.firestore, 'threadAnswer');
    this.newAnswer.messageId =
      this.channelMessages.messageData[
        this.channelMessages.selectedMessageIndex
      ]?.messageId;
    try {
      let docId = await addDoc(coll, this.newAnswer.toJSON());
      this.newAnswer.answerId = docId.id;
      this.updateIdToAnswerCollection();
    } catch (error) {
      console.log('update Id to doc failed!!');
    }
  }

  /**
   * Updates the answerId in the answer collection with the newAnswer's answerId.
   *
   * @function updateIdToAnswerCollection  
   * @returns {void}
   */
  updateIdToAnswerCollection(): void {
    const qData = doc(this.firestore, 'threadAnswer', this.newAnswer.answerId);
    const newData = { answerId: this.newAnswer.answerId };
    try {
      updateDoc(qData, newData);
    } catch (error) {
      console.log('update doc failed!!');
    }
  }

  /**
   * Retrieves answer amount data from Firestore for a selected message and updates it.
   *
   * @function getAnswerAmountFromFirestore
   * @returns {void}
   */
  getAnswerAmountFromFirestore() {
    const selectedMessageId = this.channelMessages.selectedMessageId;
    const selectedMessageData = this.channelMessages.messageData.find(
      (messageData) => messageData.messageId === selectedMessageId
    );
    if (selectedMessageData) {
      this.increaseAnswerCount(selectedMessageData);
      const qData = doc(this.firestore, 'newMessages', selectedMessageId);
      const newData = {
        amountAnswers: selectedMessageData.amountAnswers,
        lastClockTime: selectedMessageData.lastClockTime,
      };
      this.tryUpdateToFirebase(qData, newData);
    } else {
      console.error('Die ausgewählte Nachricht wurde im Array nicht gefunden.');
    }
  }

  /**
   * Increases the answer count for a selected message and updates the last clock time.
   * @function increaseAnswerCount 
   * @param {any} selectedMessageData - The data of the selected message.
   * @returns {void}
   */
  increaseAnswerCount(selectedMessageData) {
    selectedMessageData.amountAnswers += 1;
    let date = new Date();
    selectedMessageData.lastClockTime =
      date.getHours() + ':' + date.getMinutes();
  }

  /**
   * Attempts to update Firestore data using the provided query and new data.
   * Logs success or failure messages based on the outcome of the update.
   *
   * @function tryUpdateToFirebase 
   * @param {any} qData - The query data for the Firestore update.
   * @param {any} newData - The new data to be updated in Firestore.
   * @returns {void}
   */
  tryUpdateToFirebase(qData, newData) {
    try {
      updateDoc(qData, newData);
      // console.log('Antwort gesendet und amountAnswers aktualisiert.');
    } catch (error) {
      console.error('Fehler beim Aktualisieren der Firestore-Daten:', error);
    }
  }

  /**
   * Retrieves thread answers from Firestore and sorts them by date/time.
   *
   * @function getThreadAnswer 
   * @returns {Promise<void>} - A promise that resolves once the thread answers are retrieved and sorted.
   */
  async getThreadAnswer() {
    const coll = collection(this.firestore, 'threadAnswer');
    this.answers$ = collectionData(coll, { idField: 'id' });
    await this.answers$.subscribe((answer: any) => {
      this.answerData = answer.sort(
        (a, b) => a.dateTimeNumber - b.dateTimeNumber
      );
    });
  }
}
