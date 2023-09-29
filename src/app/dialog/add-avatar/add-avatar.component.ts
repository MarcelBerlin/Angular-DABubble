import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { AddAvatarService } from './add-avatar.service';

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

  constructor(private dialogRef: DialogRef, public addAS: AddAvatarService) {}

  back() {
    this.dialogRef.close();
  }

  avatarSelected(index: number) {
    this.selectedAvatar = index;
    this.addAS.pickedAvatar = this.avatars[this.selectedAvatar].img;
  }

  signup() {
    this.addAS.imgSelectedOK = true;
    this.dialogRef.close();
  }
}
