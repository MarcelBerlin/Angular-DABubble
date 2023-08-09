import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { AppComponent } from 'src/app/app.component';
import { DashboardComponentsShowHideService } from 'src/app/dashboard/dashboard-components-show-hide.service';
import { DialogProfileViewUsersComponent } from 'src/app/dialog/dialog-profile-view-users/dialog-profile-view-users.component';
import { DirectChatService } from 'src/app/direct-chat/services/direct-chat.service';
import { ChatService } from 'src/app/services/chat.service';
import { DataService } from 'src/app/services/data.service';
import { DialogAddService } from 'src/app/services/dialog-add.service';
import { MessageService } from 'src/app/services/messages.service';
import { VariablesService } from 'src/app/services/variables.service';

@Component({
  selector: 'app-channel-selection',
  templateUrl: './channel-selection.component.html',
  styleUrls: ['./channel-selection.component.scss'],
})
export class ChannelSelectionComponent implements OnInit {
  hoveredMessagesMainChat: boolean = false;
  emptyChat: boolean = true;
  chatText: string = '';
  messages$: any = [];
  messageData: any = [];
  public chatEmojiLeft: boolean = false;
  public chatEmojiRight: boolean = false;
  hoveredIndex: number | null = null;

  public chatEmoji: boolean = false;
  public emojiPicker: boolean = false;
  public emoji: string = '';
  public reactionArr: any = [];
  public emojiCounter: number = 0;

  constructor(
    private firestore: Firestore,
    private dcshService: DashboardComponentsShowHideService,
    private dialog: Dialog,
    public varService: VariablesService,
    public dataService: DataService,
    public dialogAdd: DialogAddService,
    public directChatService: DirectChatService,
    public messageService: MessageService,
    public chatService: ChatService,
    public app: AppComponent
  ) {
    console.log(this.messageData);
    
    this.allMessages();    
  }

  ngOnInit(): void {
    this.checkIfMessageDataIsEmpty();
  }

  allMessages() {
    const coll = collection(this.firestore, 'messages');
    this.messages$ = collectionData(coll, { idField: 'id' });
    this.messages$.subscribe((message: any) => {
      this.messageData = message;
      // console.log(this.messageData);
    });
  }

  /**
   * Opens the secondary chat by invoking the 'chatSlideIn' method of the 'dcshService'.
   *
   * This method is responsible for triggering the slide-in animation of the secondary chat.
   */
  openSecondaryChat() {
    this.dcshService.chatSlideIn();
  }

  /**
   * Opens the 'DialogProfileViewUsersComponent' dialog to display user profiles.
   *
   * This method is responsible for triggering the dialog to show user profiles in a view.
   * The 'DialogProfileViewUsersComponent' is used for rendering the user profile details.
   */
  profileViewUsers() {
    this.dialog.open(DialogProfileViewUsersComponent);
  }

  checkIfMessageDataIsEmpty() {
    this.emptyChat = this.messageData.length < 1;
  }

  public addEmoji(event) {
    this.chatEmoji = true;
    this.reactionArr += `${this.emoji }${event.emoji.native}`;
    // this.emojiCounter++; bei selben emoji = anzahl dahinter
    this.messageService.emojis.push(this.reactionArr);
    this.emojiPicker = false;
  }

  onHover(index: number) {
    this.hoveredIndex = index;
  }

  onHoverEnd() {
    this.hoveredIndex = null;
  }
}
