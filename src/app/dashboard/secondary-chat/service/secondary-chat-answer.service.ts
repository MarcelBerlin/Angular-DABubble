import { Injectable, OnInit } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
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
  answers$: any = [];
  answerData: any = [];
  newAnswer: Answers = new Answers();
  answerText: string = '';

  constructor(
    private firestore: Firestore,
    public timelinesService: TimelinesService,
    private dialogAddService: DialogAddService,
    private dataService: DataService,
    public varService: VariablesService,
    private directChatService: DirectChatService,
    private channelMessages: ChannelMessagesService
  ) {
   }

  async sendAnswer() {
    this.newAnswer.channelId =
      this.dialogAddService.tagsData[this.dialogAddService.channelIndex].id; // die ChannelID wird auf die jeweilige neue Message Datei angewendet
    this.varService.selectedChannelId =
      this.dialogAddService.tagsData[this.dialogAddService.channelIndex].id;
    this.newAnswer.userId = this.dataService.loggedInUserData.userId;
    this.newAnswer.userName = this.dataService.loggedInUserData.name;
    this.newAnswer.userImg = this.dataService.loggedInUserData.img;
    this.newAnswer.content = this.answerText;    

    const timeStampData: ChannelTimeStamp =
      this.directChatService.getActualTimeStampForChannels();
    this.newAnswer.dateTimeNumber = timeStampData.dateTimeNumber;
    this.newAnswer.dateString = timeStampData.dateString;
    this.newAnswer.clockString = timeStampData.clockString;

    const coll = collection(this.firestore, 'threadAnswer'); // definiert die Collection, worauf man zugreifen möchte
    await addDoc(coll, this.newAnswer.toJSON()); // fügt eine neue Nachricht aus dem Textfeld in die Firebase Collection hinzu bzw. returned die Message in docId
    this.answerData.push(this.newAnswer);
    this.answerText = '';
  }

  async getThreadAnswer() {
    const coll = collection(this.firestore, 'threadAnswer');
    this.answers$ = collectionData(coll, { idField: 'id' });
    await this.answers$.subscribe((answer: any) => {
      this.answerData = answer.sort(
        (a, b) => a.dateTimeNumber - b.dateTimeNumber
      );
      console.log(this.answerData);
    });
  }
}
