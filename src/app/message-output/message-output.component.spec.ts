import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageOutputComponent } from './message-output.component';

describe('MessageOutputComponent', () => {
  let component: MessageOutputComponent;
  let fixture: ComponentFixture<MessageOutputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MessageOutputComponent]
    });
    fixture = TestBed.createComponent(MessageOutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
