import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddManyPersonnesComponent } from './add-many-personnes.component';

describe('AddManyPersonnesComponent', () => {
  let component: AddManyPersonnesComponent;
  let fixture: ComponentFixture<AddManyPersonnesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddManyPersonnesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddManyPersonnesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
