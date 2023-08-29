import { TestBed } from '@angular/core/testing';

import { ChannelMessagesService } from './channel-messages.service';

describe('ChannelMessagesService', () => {
  let service: ChannelMessagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChannelMessagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
