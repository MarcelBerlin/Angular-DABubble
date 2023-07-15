import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondaryChatHeadComponent } from './secondary-chat-head.component';

describe('SecondaryChatHeadComponent', () => {
  let component: SecondaryChatHeadComponent;
  let fixture: ComponentFixture<SecondaryChatHeadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SecondaryChatHeadComponent]
    });
    fixture = TestBed.createComponent(SecondaryChatHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
