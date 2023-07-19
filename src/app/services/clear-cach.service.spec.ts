import { TestBed } from '@angular/core/testing';

import { ClearCachService } from './clear-cach.service';

describe('ClearCachService', () => {
  let service: ClearCachService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClearCachService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
