import { TestBed } from '@angular/core/testing';

import { SectionDataSharedService } from './section-data-shared.service';

describe('SectionDataSharedService', () => {
  let service: SectionDataSharedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SectionDataSharedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
