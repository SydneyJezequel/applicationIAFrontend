import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IrisModelComponent } from './iris-model.component';

describe('IrisModelComponent', () => {
  let component: IrisModelComponent;
  let fixture: ComponentFixture<IrisModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IrisModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IrisModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
