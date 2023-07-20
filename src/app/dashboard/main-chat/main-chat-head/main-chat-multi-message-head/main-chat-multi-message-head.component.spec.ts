import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainChatMultiMessageHeadComponent } from './main-chat-multi-message-head.component';

describe('MainChatMultiMessageHeadComponent', () => {
  let component: MainChatMultiMessageHeadComponent;
  let fixture: ComponentFixture<MainChatMultiMessageHeadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainChatMultiMessageHeadComponent]
    });
    fixture = TestBed.createComponent(MainChatMultiMessageHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
