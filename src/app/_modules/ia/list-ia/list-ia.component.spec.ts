import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListIaComponent } from './list-ia.component';

describe('ListIaComponent', () => {
  let component: ListIaComponent;
  let fixture: ComponentFixture<ListIaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListIaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListIaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
