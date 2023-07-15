import { Component } from '@angular/core';
import { TestBastiService } from '../services/test-basti.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {


  constructor(public tBS:TestBastiService){}
}
