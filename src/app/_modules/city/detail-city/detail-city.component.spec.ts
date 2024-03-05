import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailCityComponent } from './detail-city.component';

describe('DetailVilleComponent', () => {
  let component: DetailCityComponent;
  let fixture: ComponentFixture<DetailCityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailCityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
