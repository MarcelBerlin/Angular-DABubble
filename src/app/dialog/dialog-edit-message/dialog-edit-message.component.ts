import { Component } from '@angular/core';
import { ChannelMessagesService } from 'src/app/dashboard/main-chat/main-chat-chatfield/main-chat-channel-chat-field/channel-selection/service/channel-messages.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-dialog-edit-message',
  templateUrl: './dialog-edit-message.component.html',
  styleUrls: ['./dialog-edit-message.component.scss'],
})
export class DialogEditMessageComponent {
  messageEdit: string = '';

  constructor(
    private channelMessageService: ChannelMessagesService,
    private dialogRef: DialogRef
  ) {}

  editMessage() {
    this.channelMessageService.getActualMessageFromFirestore(this.messageEdit);
    setTimeout(() => {
      this.dialogRef.close();
    }, 500);
  }
}
