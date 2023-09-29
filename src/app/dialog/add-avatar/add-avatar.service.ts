import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AddAvatarService {

  pickedAvatar: string = '../../../assets/img/members/avatar7.png';
  name: string = '';
  imgSelectedOK: boolean = false;


}
