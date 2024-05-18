import { TestBed } from '@angular/core/testing';

import { CriptoserviceService } from './criptoservice.service';

describe('CriptoserviceService', () => {
  let service: CriptoserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CriptoserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
