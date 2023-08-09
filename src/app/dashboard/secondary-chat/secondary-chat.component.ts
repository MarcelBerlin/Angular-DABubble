import { Component } from '@angular/core';
import { TestBastiService } from 'src/app/services/test-basti.service';
import { VariablesService } from 'src/app/services/variables.service';

@Component({
  selector: 'app-secondary-chat',
  templateUrl: './secondary-chat.component.html',
  styleUrls: ['./secondary-chat.component.scss']
})
export class SecondaryChatComponent {
 constructor(public varService: VariablesService){}

}
