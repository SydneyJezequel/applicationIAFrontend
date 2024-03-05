import { TestBed } from '@angular/core/testing';
import { PersonServiceService } from './person-service.service';

describe('PersonneServiceService', () => {
  let service: PersonServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
