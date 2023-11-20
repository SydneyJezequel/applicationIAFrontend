import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IrisModelNewDatasetComponent } from './iris-model-new-dataset.component';

describe('IrisModelNewDatasetComponent', () => {
  let component: IrisModelNewDatasetComponent;
  let fixture: ComponentFixture<IrisModelNewDatasetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IrisModelNewDatasetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IrisModelNewDatasetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
