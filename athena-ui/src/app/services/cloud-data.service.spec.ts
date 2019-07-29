import { TestBed } from '@angular/core/testing';

import { CloudDataService } from './cloud-data.service';

describe('CloudDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CloudDataService = TestBed.get(CloudDataService);
    expect(service).toBeTruthy();
  });
});
