import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondaryChatInputfieldComponent } from './secondary-chat-inputfield.component';

describe('SecondaryChatInputfieldComponent', () => {
  let component: SecondaryChatInputfieldComponent;
  let fixture: ComponentFixture<SecondaryChatInputfieldComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SecondaryChatInputfieldComponent]
    });
    fixture = TestBed.createComponent(SecondaryChatInputfieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
