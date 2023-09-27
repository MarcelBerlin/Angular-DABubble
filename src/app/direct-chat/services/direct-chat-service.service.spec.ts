import { TestBed } from '@angular/core/testing';

import { DirectChatServiceService } from './direct-chat-service.service';

describe('DirectChatServiceService', () => {
  let service: DirectChatServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DirectChatServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
