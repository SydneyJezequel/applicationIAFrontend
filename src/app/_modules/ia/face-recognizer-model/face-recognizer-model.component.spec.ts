import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaceRecognizerModelComponent } from './face-recognizer-model.component';

describe('FaceRecognizerModelComponent', () => {
  let component: FaceRecognizerModelComponent;
  let fixture: ComponentFixture<FaceRecognizerModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FaceRecognizerModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FaceRecognizerModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
