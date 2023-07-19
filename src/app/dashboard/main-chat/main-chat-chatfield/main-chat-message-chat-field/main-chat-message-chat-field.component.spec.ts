import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainChatMessageChatFieldComponent } from './main-chat-message-chat-field.component';

describe('MainChatMessageChatFieldComponent', () => {
  let component: MainChatMessageChatFieldComponent;
  let fixture: ComponentFixture<MainChatMessageChatFieldComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainChatMessageChatFieldComponent]
    });
    fixture = TestBed.createComponent(MainChatMessageChatFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
