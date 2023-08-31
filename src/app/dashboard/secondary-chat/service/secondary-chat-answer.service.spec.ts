import { TestBed } from '@angular/core/testing';

import { SecondaryChatAnswerService } from './secondary-chat-answer.service';

describe('SecondaryChatAnswerService', () => {
  let service: SecondaryChatAnswerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SecondaryChatAnswerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
