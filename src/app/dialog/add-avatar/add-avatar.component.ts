import { DialogRef } from '@angular/cdk/dialog';
import { Component} from '@angular/core';
import { AddAvatarService } from './add-avatar.service';
import { UploadService } from 'src/app/file-upload/services/upload.service';
@Component({
  selector: 'app-add-avatar',
  templateUrl: './add-avatar.component.html',
  styleUrls: ['./add-avatar.component.scss'],
})
export class AddAvatarComponent {
  avatars = [
    { img: '../../../assets/img/members/avatar1.png' },
    { img: '../../../assets/img/members/avatar2.png' },
    { img: '../../../assets/img/members/avatar3.png' },
    { img: '../../../assets/img/members/avatar4.png' },
    { img: '../../../assets/img/members/avatar5.png' },
    { img: '../../../assets/img/members/avatar6.png' },
  ];

  selectedAvatar: number = 6;

  constructor(
    private dialogRef: DialogRef, 
    public addAS: AddAvatarService,
    public uploadService: UploadService) {

  }


  /**
 * Handles navigating back or canceling an operation.
 *
 * @method
 * @returns {void}
 */
  back() {
    this.dialogRef.close();
  }


  /**
 * Handles the selection of an avatar.
 *
 * @method
 * @param {number} index - The index of the selected avatar.
 * @returns {void}
 */
  avatarSelected(index: number) {
    this.selectedAvatar = index;
    this.addAS.pickedAvatar = this.avatars[this.selectedAvatar].img;
  }


  /**
 * Handles the signup process.
 *
 * @method
 * @returns {void}
 */
  signup() {
    this.addAS.imgSelectedOK = true;
    this.dialogRef.close();
  }
}
