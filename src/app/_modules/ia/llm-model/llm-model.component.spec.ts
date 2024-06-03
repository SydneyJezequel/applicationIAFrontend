import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LlmModelComponent } from './llm-model.component';

describe('LlmModelComponent', () => {
  let component: LlmModelComponent;
  let fixture: ComponentFixture<LlmModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LlmModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LlmModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
