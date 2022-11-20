import { TestBed } from '@angular/core/testing';

import { NslDicomOperationService } from './nsl-dicom-operation.service';

describe('NslDicomOperationService', () => {
  let service: NslDicomOperationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NslDicomOperationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
