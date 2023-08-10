import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { Firestore, doc, updateDoc } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { DialogAddService } from 'src/app/services/dialog-add.service';
import { VariablesService } from 'src/app/services/variables.service';

@Component({
  selector: 'app-dialog-channel-edition',
  templateUrl: './dialog-channel-edition.component.html',
  styleUrls: ['./dialog-channel-edition.component.scss'],
})
export class DialogChannelEditionComponent {
  name: boolean = false;
  description: boolean = false;
  editName: string = '';
  editDescription: string = '';
  channelId = this.tagChannel.tagsData[this.variableService.selectedChannel].id;
  channelCreator: string = '';
  changedString: string = '';
  jsonKey: string = '';

  constructor(
    public dialog: MatDialog,
    private dialogRef: DialogRef,
    public variableService: VariablesService,
    public tagChannel: DialogAddService,
    private firestore: Firestore,
    private dataService: DataService
  ) {
    this.creatorEmailToName();
  }

  /**
   * Converts a creator's email to their name based on the provided data.
   *
   * This function retrieves the name of a channel creator using their email
   * from the provided tag channel data and user data.
   *
   * @memberof YourNamespace
   *
   */
  creatorEmailToName() {
    const creatorEmail =
      this.tagChannel.tagsData[this.variableService.selectedChannel]
        ?.channelCreator;
    const creatorData = this.dataService.userData.find(
      (data) => data.email === creatorEmail
    );
    this.channelCreator = creatorData?.name || '';
  }

  /**
   * Closes the current dialog.
   *
   */
  closeDialog() {
    this.dialogRef.close();
  }

  /**
   * Toggles the edit state of the specified item.
   *
   * @param {string} item - The name of the property representing the item to toggle.
   */
  editOn(item: string) {
    this[item] = !this[item];
  }

  /**
   * Saves the specified element and updates related properties.
   *
   * @param {string} element - The element to be saved ('name' or 'description').
   */
  save(element: string) {
    this.jsonKey = element;
    this.changedString =
      element === 'name' ? '# ' + this.editName : this.editDescription;
    this.editOn(element);
    this.channelAttributeChange();
  }

  /**
   * Updates a specific attribute of a channel in the 'tags' collection.
   */
  channelAttributeChange() {
    const document = doc(this.firestore, 'tags', this.channelId);
    const newData = {
      [this.jsonKey]: this.changedString,
    };
    updateDoc(document, newData);
  }
}
