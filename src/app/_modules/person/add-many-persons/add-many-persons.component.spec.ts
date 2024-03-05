import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddManyPersonsComponent } from './add-many-persons.component';

describe('AddManyPersonnesComponent', () => {
  let component: AddManyPersonsComponent;
  let fixture: ComponentFixture<AddManyPersonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddManyPersonsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddManyPersonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
