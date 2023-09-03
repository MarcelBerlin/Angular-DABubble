import { Injectable, OnInit } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  doc,
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

  constructor(
    private firestore: Firestore,
    public timelinesService: TimelinesService,
    private dialogAddService: DialogAddService,
    public dataService: DataService,
    public varService: VariablesService,
    private directChatService: DirectChatService,
    public channelMessages: ChannelMessagesService
  ) {

   }

  async sendAnswer() {    
    this.UserAndAnswerDetails();
    this.addTimeStampToAnswer();    
    this.saveAnswerWithAnswerId();
    this.answerData.push(this.newAnswer);    
    this.answerText = '';   
    console.log(this.answerData); 
  }

  UserAndAnswerDetails() {
    this.newAnswer.channelId =
    this.dialogAddService.tagsData[this.dialogAddService.channelIndex].id; // die ChannelID wird auf die jeweilige neue Message Datei angewendet
    this.varService.selectedChannelId =
    this.dialogAddService.tagsData[this.dialogAddService.channelIndex].id;
    this.newAnswer.userId = this.dataService.loggedInUserData.userId;
    this.newAnswer.userName = this.dataService.loggedInUserData.name;
    this.newAnswer.userImg = this.dataService.loggedInUserData.img;
    this.newAnswer.content = this.answerText;  
    
  }

  addTimeStampToAnswer() {
    const timeStampData: ChannelTimeStamp =
    this.directChatService.getActualTimeStampForChannels();
    this.newAnswer.dateTimeNumber = timeStampData.dateTimeNumber;
    this.newAnswer.dateString = timeStampData.dateString;
    this.newAnswer.clockString = timeStampData.clockString;
  }

  async saveAnswerWithAnswerId(): Promise<void> {
    const coll = collection(this.firestore, 'threadAnswer'); // definiert die Collection, worauf man zugreifen möchte
    this.newAnswer.messageId = this.channelMessages.messageData[this.channelMessages.selectedMessageIndex]?.messageId;
    try {
      let docId = await addDoc(coll, this.newAnswer.toJSON()); // generiert für das Dokument eine eigene ID in Firestore
      this.newAnswer.answerId = docId.id; // die DokumentID wird auf die Variable messageID gesetzt.
      this.updateIdToAnswerCollection(); // funktion zum Updaten der Dokumenten ID in die Collection selbst, damit später darauf zugegriffen werden kann.
    } catch (error) {
      console.log('update Id to doc failed!!');
    }
  }

  updateIdToAnswerCollection(): void {
    const qData = doc(this.firestore, 'threadAnswer', this.newAnswer.answerId);
    const newData = { answerId: this.newAnswer.answerId };
    try {
      updateDoc(qData, newData);
    } catch (error) {
      console.log('update doc failed!!');
    }    
  }


  async getThreadAnswer() {
    const coll = collection(this.firestore, 'threadAnswer');
    this.answers$ = collectionData(coll, { idField: 'id' });
    await this.answers$.subscribe((answer: any) => {
      this.answerData = 
      answer.sort(
        (a, b) => a.dateTimeNumber - b.dateTimeNumber
      );      
    });
  }
}
