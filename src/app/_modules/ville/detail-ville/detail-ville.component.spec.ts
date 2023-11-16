import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailVilleComponent } from './detail-ville.component';

describe('DetailVilleComponent', () => {
  let component: DetailVilleComponent;
  let fixture: ComponentFixture<DetailVilleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailVilleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailVilleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
