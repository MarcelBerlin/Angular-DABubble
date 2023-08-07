import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddService } from 'src/app/services/dialog-add.service';
import { TestBastiService } from 'src/app/services/test-basti.service';
import { VariablesService } from 'src/app/services/variables.service';

@Component({
  selector: 'app-dialog-channel-edition',
  templateUrl: './dialog-channel-edition.component.html',
  styleUrls: ['./dialog-channel-edition.component.scss'],
})
export class DialogChannelEditionComponent {
  name: boolean = false;
  description: boolean = false;

  constructor(
    public dialog: MatDialog,
    private dialogRef: DialogRef,
    public tBS: TestBastiService,
    public variableService: VariablesService,
    public tagChannel: DialogAddService,
  ) {}

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
}
