import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { DialogAddService } from '../services/dialog-add.service';

@Component({
  selector: 'app-dialog-add-channel',
  templateUrl: './dialog-add-channel.component.html',
  styleUrls: ['./dialog-add-channel.component.scss']
})
export class DialogAddChannelComponent {

  newTag: string = '';

  constructor(private dialogRef : DialogRef, public getService: DialogAddService) {

  }

  closeDialog() {
    this.dialogRef.close()
  }

  generateTag() {
    this.getService.addTag(this.newTag);
    this.newTag = ''; // Zurücksetzen des Inputfelds nach dem Hinzufügen
  }

}
