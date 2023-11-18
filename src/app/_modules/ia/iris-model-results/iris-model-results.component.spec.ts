import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IrisModelResultsComponent } from './iris-model-results.component';

describe('IrisModelResultsComponent', () => {
  let component: IrisModelResultsComponent;
  let fixture: ComponentFixture<IrisModelResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IrisModelResultsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IrisModelResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
