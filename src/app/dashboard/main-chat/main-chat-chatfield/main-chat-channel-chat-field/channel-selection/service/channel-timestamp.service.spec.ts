import { TestBed } from '@angular/core/testing';

import { ChannelTimestampService } from './channel-timestamp.service';

describe('ChannelTimestampService', () => {
  let service: ChannelTimestampService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChannelTimestampService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
