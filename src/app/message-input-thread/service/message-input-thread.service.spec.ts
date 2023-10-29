import { TestBed } from '@angular/core/testing';

import { MessageInputThreadService } from './message-input-thread.service';

describe('MessageInputThreadService', () => {
  let service: MessageInputThreadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageInputThreadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
