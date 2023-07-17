import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainChatMessageHeadComponent } from './main-chat-message-head.component';

describe('MainChatMessageHeadComponent', () => {
  let component: MainChatMessageHeadComponent;
  let fixture: ComponentFixture<MainChatMessageHeadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainChatMessageHeadComponent]
    });
    fixture = TestBed.createComponent(MainChatMessageHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
