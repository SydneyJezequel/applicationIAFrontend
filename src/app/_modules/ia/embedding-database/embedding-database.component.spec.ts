import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmbeddingDatabaseComponent } from './embedding-database.component';

describe('EmbeddingDatabaseComponent', () => {
  let component: EmbeddingDatabaseComponent;
  let fixture: ComponentFixture<EmbeddingDatabaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmbeddingDatabaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmbeddingDatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
