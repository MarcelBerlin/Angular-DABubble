import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainChatTimeSeparatorComponent } from './main-chat-time-separator.component';

describe('MainChatTimeSeparatorComponent', () => {
  let component: MainChatTimeSeparatorComponent;
  let fixture: ComponentFixture<MainChatTimeSeparatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainChatTimeSeparatorComponent]
    });
    fixture = TestBed.createComponent(MainChatTimeSeparatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
