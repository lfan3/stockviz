import { TestBed } from '@angular/core/testing';

import { FundamentalService } from './fundamental.service';

describe('FundamentalService', () => {
  let service: FundamentalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FundamentalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
